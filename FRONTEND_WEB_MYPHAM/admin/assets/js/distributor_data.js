app.controller ('distributor', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.key = $routeParams.key;
    $scope.value = $routeParams.value;
}]);

app.controller("DistributorCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[8]).addClass('active_option')
    
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
            url: current_url + '/api-admin/NhaPhanPhoi/search-nhaphanphoi',
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
        if((!$scope.timkiem&&!$scope.luachontimkiem)||(!$scope.timkiem&&$scope.luachontimkiem)){
            window.location='#!distributor/1'
        }
        else if($scope.timkiem&&!$scope.luachontimkiem){
            $scope.key = 'TenNhaPhanPhoi'
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
                    url: current_url + '/api-admin/NhaPhanPhoi/search-nhaphanphoi',
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
                    url: current_url + '/api-admin/NhaPhanPhoi/search-nhaphanphoi',
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
        $('#pagination').pagination({
            dataSource: function(done){
                var result = [];
                for(var i = 1; i <= total; i++){
                    result.push(i);
                }
                done(result);
            },
            pageSize: $scope.pageSize,
            pageNumber: $scope.page,
            showGoInput: true,
            showGoButton: true,
            className: 'paginationjs-theme-blue paginationjs-big',
            afterGoButtonOnClick :function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.key&&$scope.value){
                        window.location='#!distributor/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location='#!distributor/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.key&&$scope.value){
                        window.location='#!distributor/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location='#!distributor/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.key&&$scope.value){
                    window.location='#!distributor/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!distributor/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.key&&$scope.value){
                    window.location='#!distributor/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!distributor/'+pageNumber
                }
                
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.key&&$scope.value){
                    window.location='#!distributor/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!distributor/'+pageNumber
                }
            }
        })
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
                url: current_url + '/api-admin/NhaPhanPhoi/delete-nhaphanphoi',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
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
        $scope.linkweb=''
        $scope.mota=''
    }

    $scope.save = function(){
        if($scope.tennhaphanphoi==='', $scope.diachi==='',$scope.sodienthoai==='',
            $scope.linkweb==='', $scope.mota===''){
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
                    LinkWeb: $scope.linkweb,
                    MoTa: $scope.mota
                },
                url: current_url + '/api-admin/NhaPhanPhoi/create-nhaphanphoi',
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
            if(confirm("Bạn có muốn sửa thông tin nhà phân phối không !")){
                $http({
                    method: 'PUT',
                    data: {
                        MaNhaPhanPhoi: $scope.MaNhaPhanPhoi,
                        TenNhaPhanPhoi: $scope.tennhaphanphoi,
                        DiaChi: $scope.diachi,
                        SoDienThoai: $scope.sodienthoai,
                        LinkWeb: $scope.linkweb,
                        MoTa: $scope.mota
                    },
                    url: current_url + '/api-admin/NhaPhanPhoi/update-nhaphanphoi',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
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
    }

    $scope.edit = function(x){
        $scope.submit = "Chỉnh sửa";
        $(".product-container").toggleClass("hide")
        $scope.MaNhaPhanPhoi = x.maNhaPhanPhoi
        $scope.tennhaphanphoi = x.tenNhaPhanPhoi
        $scope.diachi = x.diaChi
        $scope.sodienthoai = x.soDienThoai
        $scope.linkweb = x.linkWeb
        $scope.mota = x.moTa
    }
})