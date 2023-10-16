app.controller ('distributor', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("DistributorCtrl", function ($scope, $http) {
    $scope.submit = "Thêm mới";
	$scope.listDistributor;	
    $scope.pageSize=10
    $scope.MaNhaPhanPhoi

    $scope.GetDistributor= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: {
                page: $scope.page,
                pageSize: $scope.pageSize
            },
            url: current_url + '/api/NhaPhanPhoi/search-nhaphanphoi',
        }).then(function (response) {  
            $scope.listDistributor = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetDistributor();

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
                    a.href='#!distributor/'+a.innerHTML
                }
            }    

            aItem[currentPage - 1].classList.add('activePage');

            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    window.location='#!distributor/'+$scope.page
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    window.location='#!distributor/'+$scope.page
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
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Xoá thành công')
                window.location='#!distributor/'+$scope.page
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
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Thêm thành công')
                window.location='#!distributor/'+$scope.page
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
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Sửa thành công')
                window.location='#!distributor/'+$scope.page
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