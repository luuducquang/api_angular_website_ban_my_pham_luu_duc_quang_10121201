app.controller("TypeAccountCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[11]).addClass('active_option')
    
    $scope.submit = "Thêm mới";
    $scope.listTypeAcount
    $scope.maloaitk

    $scope.GetTypeuser= function () {
        $http({
            method: 'GET',
            url:current_url+'/api-admin/LoaiTaiKhoan/get_all_loaitaikhoan',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        })
        .then(function (response) {  
            $scope.listTypeAcount = response.data
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetTypeuser();

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maLoaitaikhoan);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maLoaitaikhoan);
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
                url: current_url + '/api-admin/LoaiTaiKhoan/delete_loaitaikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                window.location='#!typeaccount'
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.btnAdd=function(){
        $scope.submit="Thêm mới"
        $scope.tenloai=''
        $scope.mota=''
    }

    $scope.edit = function(x){
        $scope.submit = "Chỉnh sửa";
        $(".product-container").toggleClass("hide")
        $scope.maloaitk = x.maLoaitaikhoan
        $scope.tenloai = x.tenLoai
        $scope.mota = x.moTa
    }

    $scope.save = function(){
        if($scope.tenloai==='', $scope.mota===''){
            alert("Vui lòng nhập đủ thông tin")
            return
        }
        
        if($scope.submit==="Thêm mới"){
            $http({
                method: 'POST',
                data: {
                    TenLoai: $scope.tenloai,
                    MoTa: $scope.mota
                },
                url: current_url + '/api-admin/LoaiTaiKhoan/create_loaitaikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Thêm thành công')
                window.location='#!typeaccount'
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            });
        }
        else{
            if(confirm("Bạn có muốn sửa thông tin loại tài khoản không !")){
                $http({
                    method: 'PUT',
                    data: {
                        MaLoaitaikhoan: $scope.maloaitk,
                        TenLoai: $scope.tenloai,
                        MoTa: $scope.mota
                    },
                    url: current_url + '/api-admin/LoaiTaiKhoan/update_loaitaikhoan',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    window.location='#!typeaccount'
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }
        }
    }
})