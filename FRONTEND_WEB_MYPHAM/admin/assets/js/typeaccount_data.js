app.controller("TypeAccountCtrl", function ($scope, $http) {
    $scope.submit = "Thêm mới";
    $scope.listTypeAcount
    $scope.maloaitk

    $scope.GetTypeuser= function () {
        $http.get(current_url+'/api/LoaiTaiKhoan/get_all_loaitaikhoan')
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
                url: current_url + '/api/LoaiTaiKhoan/delete_loaitaikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                alert('Xoá thành công')
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
                url: current_url + '/api/LoaiTaiKhoan/create_loaitaikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Thêm thành công')
                window.location='#!typeaccount'
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            });
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaLoaitaikhoan: $scope.maloaitk,
                    TenLoai: $scope.tenloai,
                    MoTa: $scope.mota
                },
                url: current_url + '/api/LoaiTaiKhoan/update_loaitaikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Sửa thành công')
                window.location='#!typeaccount'
            }).catch(function (error) {
                console.error('Lỗi khi sửa sản phẩm:', error);
            });
        }
    }
})