app.controller ('distributor', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.key = $routeParams.key;
    $scope.value = $routeParams.value;
}]);

app.controller("DistributorCtrl", function ($scope, $http) {
    $scope.submit = "Thêm mới";
	$scope.listDistributor;	
    $scope.pageSize=10
    $scope.MaNhaPhanPhoi

    var datas = {
        page: $scope.page,
        pageSize: $scope.pageSize
    }
    datas[$scope.key] = $scope.value

    $scope.GetDistributor= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api/NhaPhanPhoi/search-nhaphanphoi',
        }).then(function (response) {  
            $scope.listDistributor = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetDistributor();

    //------------------------------------------------------------------------------//
    $scope.timkiem = $scope.value
    $scope.luachontimkiem = $scope.key

    $scope.search = function(){
        if($scope.luachontimkiem===undefined||
            $scope.luachontimkiem===''){
            alert('Vui lòng chọn loại tìm kiếm')
            return
        }
        if($scope.timkiem===undefined||$scope.timkiem===''){
            window.location='#!distributor/1'
        }
        else{
            $scope.key = $scope.luachontimkiem
                $scope.value = $scope.timkiem
                var data = {
                    page: 1,
                    pageSize: 10
                };
                data[$scope.key] = $scope.value
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + _user.token },
                    data: data,
                    url: current_url + '/api/NhaPhanPhoi/search-nhaphanphoi',
                }).then(function (response) {  
                    if(response.data.totalItems===0){
                        alert("Không có nhà phân phối nào")
                        $scope.key =''
                        $scope.value =''
                        return
                    }
                    else{
                        window.location='#!distributor/1/'+$scope.key+'/'+$scope.value
                    }
                }).catch(function (error) {
                    console.error('Lỗi :', error);
                });
        }
    }
    //------------------------------------------------------------------------------//

    $scope.pageIndex = function(total){
        $('.page-count li').remove()
            var count = Math.ceil((total) / $scope.pageSize)
            var currentPage = $scope.page;
            var aItem = [];
            for (var i = 1; i < count + 1; i++) {
                let li = document.createElement('li')
                li.className = 'page-item'
                let a = document.createElement('a')
                a.className = 'page-link'
                li.appendChild(a)
                a.innerText = i
                aItem.push(a);
                $('.page-count').append(li)
                a.onclick = function () {
                    $scope.changePage(a.innerHTML)
                    if($scope.key&&$scope.value){
                        a.href='#!distributor/'+a.innerHTML+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        a.href='#!distributor/'+a.innerHTML
                    }
                }
            }    

            aItem[currentPage - 1].classList.add('activePage');

            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    if($scope.key&&$scope.value){
                        window.location='#!distributor/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location='#!distributor/'+$scope.page
                    }
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    if($scope.key&&$scope.value){
                        window.location='#!distributor/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location='#!distributor/'+$scope.page
                    }
                }
            }
    }
    
    $scope.changePage=function(i) {
        $scope.page = i
    }

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maNhaPhanPhoi);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maNhaPhanPhoi);
            console.log($scope.selected);
        }
    }

    yesdel = function(){
        if($scope.selected.length === 0){
            alert("Chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'DELETE',
                data: $scope.selected,
                url: current_url + '/api/NhaPhanPhoi/delete-nhaphanphoi',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                alert('Xoá thành công')
                if($scope.key&&$scope.value){
                    window.location='#!distributor/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!distributor/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.btnAdd=function(){
        $scope.submit="Thêm mới"
        $scope.tennhaphanphoi='' 
        $scope.diachi=''
        $scope.sodienthoai=''
        $scope.fax=''
        $scope.mota=''
    }

    $scope.save = function(){
        if($scope.tennhaphanphoi==='', $scope.diachi==='',$scope.sodienthoai==='',
            $scope.fax==='', $scope.mota===''){
            alert("Vui lòng nhập đủ thông tin")
            return
        }
        
        if($scope.submit==="Thêm mới"){
            $http({
                method: 'POST',
                data: {
                    TenNhaPhanPhoi: $scope.tennhaphanphoi,
                    DiaChi: $scope.diachi,
                    SoDienThoai: $scope.sodienthoai,
                    Fax: $scope.fax,
                    MoTa: $scope.mota
                },
                url: current_url + '/api/NhaPhanPhoi/create-nhaphanphoi',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Thêm thành công')
                if($scope.key&&$scope.value){
                    window.location='#!distributor/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!distributor/'+$scope.page
                }
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            });
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaNhaPhanPhoi: $scope.MaNhaPhanPhoi,
                    TenNhaPhanPhoi: $scope.tennhaphanphoi,
                    DiaChi: $scope.diachi,
                    SoDienThoai: $scope.sodienthoai,
                    Fax: $scope.fax,
                    MoTa: $scope.mota
                },
                url: current_url + '/api/NhaPhanPhoi/update-nhaphanphoi',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Sửa thành công')
                if($scope.key&&$scope.value){
                    window.location='#!distributor/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!distributor/'+$scope.page
                }
            }).catch(function (error) {
                console.error('Lỗi khi sửa sản phẩm:', error);
            });
        }
    }

    $scope.edit = function(x){
        $scope.submit = "Chỉnh sửa";
        $(".product-container").toggleClass("hide")
        $scope.MaNhaPhanPhoi = x.maNhaPhanPhoi
        $scope.tennhaphanphoi = x.tenNhaPhanPhoi
        $scope.diachi = x.diaChi
        $scope.sodienthoai = x.soDienThoai
        $scope.fax = x.fax
        $scope.mota = x.moTa
    }
})