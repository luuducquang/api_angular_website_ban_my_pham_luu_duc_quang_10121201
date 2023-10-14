app.controller ('account', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("AccountCtrl", function ($scope, $http) {
	$scope.listAccount;	
    $scope.pageSize=10
    $scope.Image
    $scope.MaAccount
    $scope.listTypeAccount
    $scope.listloaitk
    $scope.listTaiKhoanDetail
    $scope.Image

    $scope.GetallLoaiTK = function(){
        $http.get(current_url+'/api/LoaiTaiKhoan/get_all_loaitaikhoan')
        .then(function (response) {  
            $scope.listloaitk = response.data; 
        });
    }
    $scope.GetallLoaiTK()

    $scope.GetTypeAccount= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: {
                page: $scope.page,
                pageSize: $scope.pageSize
            },
            url: current_url + '/api/TaiKhoan/search-taikhoansingle',
        }).then(function (response) {  
            $scope.listAccount = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetTypeAccount();

    $scope.pageIndex = function(total){
        $('.page-count li').remove()
            var count = Math.ceil((total) / $scope.pageSize)
            for (var i = 1; i < count + 1; i++) {
                let li = document.createElement('li')
                li.className = 'page-item'
                let a = document.createElement('a')
                a.className = 'page-link'
                li.appendChild(a)
                a.innerText = i
                $('.page-count').append(li)
                a.onclick = function () {
                    $scope.changePage(a.innerHTML)
                    a.href='#!account/'+a.innerHTML
                }
            }    
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    window.location='#!account/'+$scope.page
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    window.location='#!account/'+$scope.page
                }
            }
    }
    
    $scope.changePage=function(i) {
        $scope.page = i
    }

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maTaiKhoan);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maTaiKhoan);
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
                url: current_url + '/api/TaiKhoan/delete-taikhoan',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Xoá thành công')
                window.location='#!account/'+$scope.page
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    var preview = document.querySelector('.Img')
    $scope.getFilePathProduct=function(){
        $('#Image').change(function () {
            var file = this.files[0]
            if(!file){
                return
            }
            if(file.size / (1024*1024)>5){
                alert("File không được quá 5MB")
            }
            if (file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = function(e){
                    preview.src = e.target.result
                }
            }
        });
    }
    $scope.getFilePathProduct()

    $scope.mataikhoan
    $scope.edit=function(x){
        $(".product-container").toggleClass("hide")
        $(".detail").show()
        $(".saveAdd").hide()
        $scope.mataikhoan = x.maTaiKhoan
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api/TaiKhoan/getbyid-taikhoan-chitiettaikhoan/' + x.maTaiKhoan,
        }).then(function (response) {
            $scope.listTaiKhoanDetail=response.data
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
        $scope.tentaikhoan = x.tenTaiKhoan
        $scope.matkhau = x.matKhau
        $scope.email = x.email
        $scope.loaitaikhoan = ""
        $scope.anhdaidien = ""
        $scope.hoten = ""
        $scope.diachi = ""
        $scope.sodienthoai = ""
    }

    $scope.btnAdd=function(){
        $scope.tentaikhoan = ""
        $scope.matkhau = ""
        $scope.email = ""
        $scope.loaitaikhoan = ""
        $scope.anhdaidien = ""
        $scope.hoten = ""
        $scope.diachi = ""
        $scope.sodienthoai = ""
        $(".detail").hide()
        $(".saveAdd").show()
    }

    $scope.addBill=function(){
        if($scope.tentaikhoan === ""||
        $scope.matkhau === ""||
        $scope.email === ""||
        $scope.loaitaikhoan === ""||
        $scope.hoten === ""||
        $scope.diachi === ""||
        $scope.sodienthoai === ""){
            alert("Vui lòng điền đủ thông tin") 
            return
        }

        var file = document.getElementById('Image').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + _user.token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/Image/upload',
            }).then(function (res) {
                $scope.Image = res.data.filePath;
                preview.src = "./assets/img"+ $scope.Image
                $http({
                    method: 'POST',
                    data: {
                        TenTaiKhoan: $scope.tentaikhoan,
                        MatKhau: $scope.matkhau,
                        Email: $scope.email,
                        list_json_chitiet_taikhoan:[{
                            MaLoaitaikhoan: $scope.loaitaikhoan,
                            AnhDaiDien: "./assets/img"+$scope.Image,
                            HoTen:$scope.hoten,
                            DiaChi:$scope.diachi,
                            SoDienThoai:$scope.sodienthoai
                        }]
                    },
                    url: current_url + '/api/TaiKhoan/create-taikhoan',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Thêm thành công')
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
            });
        }
        else{
            $http({
                method: 'POST',
                data: {
                    TenTaiKhoan: $scope.tentaikhoan,
                    MatKhau: $scope.matkhau,
                    Email: $scope.email,
                    list_json_chitiet_taikhoan:[{
                        MaLoaitaikhoan: $scope.loaitaikhoan,
                        AnhDaiDien: "./assets/img"+$scope.Image,
                        HoTen:$scope.hoten,
                        DiaChi:$scope.diachi,
                        SoDienThoai:$scope.sodienthoai
                    }]
                },
                url: current_url + '/api/TaiKhoan/create-taikhoan',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Thêm thành công')
                window.location='#!account/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            });
        }
    }

    $scope.refreshDetail=function(){
        $scope.loaitaikhoan = ""
        $scope.hoten = ""
        $scope.diachi = ""
        $scope.sodienthoai = ""
        $scope.anhdaidien=""
        preview.src=""
        $scope.machitiettaikhoan=undefined
    }

    $scope.addDetail=function(){
        if($scope.loaitaikhoan === ""||
        $scope.hoten === ""||
        $scope.diachi === ""||
        $scope.sodienthoai === ""){
            alert("Vui lòng điền đủ thông tin")
            return
        }
        var file = document.getElementById('Image').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + _user.token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api/Image/upload',
            }).then(function (res) {
                $scope.Image = res.data.filePath;
                preview.src = "./assets/img"+ $scope.Image
                $http({
                    method: 'PUT',
                    data: {
                        MaTaiKhoan:$scope.mataikhoan,
                        TenTaiKhoan: $scope.tentaikhoan,
                        MatKhau: $scope.matkhau,
                        Email: $scope.email,
                        list_json_chitiet_taikhoan:[{
                            MaLoaitaikhoan: $scope.loaitaikhoan,
                            AnhDaiDien: "./assets/img"+$scope.Image,
                            HoTen:$scope.hoten,
                            DiaChi:$scope.diachi,
                            SoDienThoai:$scope.sodienthoai,
                            status:1
                        }]
                    },
                    url: current_url + '/api/TaiKhoan/update-taikhoan',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Thêm chi tiết thành công')
                    window.location='#!account/'+$scope.page
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                    console.log($scope.gia);
                });
            });
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaTaiKhoan:$scope.mataikhoan,
                    TenTaiKhoan: $scope.tentaikhoan,
                    MatKhau: $scope.matkhau,
                    Email: $scope.email,
                    list_json_chitiet_taikhoan:[{
                        MaLoaitaikhoan: $scope.loaitaikhoan,
                        AnhDaiDien: "./assets/img"+$scope.Image,
                        HoTen:$scope.hoten,
                        DiaChi:$scope.diachi,
                        SoDienThoai:$scope.sodienthoai,
                        status:1
                    }]
                },
                url: current_url + '/api/TaiKhoan/update-taikhoan',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Thêm chi tiết thành công')
                window.location='#!account/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
                console.log($scope.gia);
            });
        }
        
    }

    $scope.machitiettaikhoan
    $scope.clicktoEdit=function(y){
        $scope.machitiettaikhoan = y.maChitietTaiKhoan
        $scope.loaitaikhoan = String(y.maLoaitaikhoan)
        $scope.hoten = y.hoTen
        $scope.diachi = y.diaChi
        $scope.sodienthoai = y.soDienThoai
        $scope.anhdaidien = y.anhDaiDien
        preview.src = y.anhDaiDien
    }

    $scope.editDetail=function(){
        if($scope.machitiettaikhoan){
            if($scope.loaitaikhoan === ""||
                $scope.hoten === ""||
                $scope.diachi === ""||
                $scope.sodienthoai === ""){
                alert("Vui lòng điền đủ thông tin")
                return
            }
            var file = document.getElementById('Image').files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                $http({
                    method: 'POST',
                    headers: {
                        "Authorization": 'Bearer ' + _user.token,
                        'Content-Type': undefined
                    },
                    data: formData,
                    url: current_url + '/api/Image/upload',
                }).then(function (res) {
                    $scope.Image = res.data.filePath;
                    preview.src = "./assets/img"+ $scope.Image
                    $http({
                        method: 'PUT',
                        data: {
                            MaTaiKhoan:$scope.mataikhoan,
                            TenTaiKhoan: $scope.tentaikhoan,
                            MatKhau: $scope.matkhau,
                            Email: $scope.email,
                            list_json_chitiet_taikhoan:[{
                                MaChitietTaiKhoan: $scope.machitiettaikhoan,
                                MaLoaitaikhoan: $scope.loaitaikhoan,
                                AnhDaiDien: "./assets/img"+$scope.Image,
                                HoTen:$scope.hoten,
                                DiaChi:$scope.diachi,
                                SoDienThoai:$scope.sodienthoai,
                                status:2
                            }]
                        },
                        url: current_url + '/api/TaiKhoan/update-taikhoan',
                        headers: {'Content-Type': 'application/json'}
                    }).then(function (response) {  
                        alert('Sửa chi tiết thành công')
                        window.location='#!account/'+$scope.page
                    }).catch(function (error) {
                        console.error('Lỗi khi thêm sản phẩm:', error);
                        console.log($scope.gia);
                    });
                });
            }
            else{
                $http({
                    method: 'PUT',
                    data: {
                        MaTaiKhoan:$scope.mataikhoan,
                        TenTaiKhoan: $scope.tentaikhoan,
                        MatKhau: $scope.matkhau,
                        Email: $scope.email,
                        list_json_chitiet_taikhoan:[{
                            MaChitietTaiKhoan: $scope.machitiettaikhoan,
                            MaLoaitaikhoan: $scope.loaitaikhoan,
                            AnhDaiDien: $scope.anhdaidien,
                            HoTen:$scope.hoten,
                            DiaChi:$scope.diachi,
                            SoDienThoai:$scope.sodienthoai,
                            status:2
                        }]
                    },
                    url: current_url + '/api/TaiKhoan/update-taikhoan',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Sửa chi tiết thành công')
                    window.location='#!account/'+$scope.page
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                    console.log($scope.gia);
                });
            }
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaTaiKhoan:$scope.mataikhoan,
                    TenTaiKhoan: $scope.tentaikhoan,
                    MatKhau: $scope.matkhau,
                    Email: $scope.email,
                    list_json_chitiet_taikhoan:[{
                        MaChitietTaiKhoan: 0,
                        MaLoaitaikhoan: 0,
                        AnhDaiDien: '',
                        HoTen:'',
                        DiaChi:'',
                        SoDienThoai:'',
                        status:0
                    }]
                },
                url: current_url + '/api/TaiKhoan/update-taikhoan',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Sửa chi tiết thành công')
                window.location='#!account/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
                console.log($scope.gia);
            });
        }
    }

    $scope.deleteDetail=function(){
        if(!$scope.machitiettaikhoan){
            alert("Chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaTaiKhoan:$scope.mataikhoan,
                    TenTaiKhoan: $scope.tentaikhoan,
                    MatKhau: $scope.matkhau,
                    Email: $scope.email,
                    list_json_chitiet_taikhoan:[{
                        MaChitietTaiKhoan: $scope.machitiettaikhoan,
                        MaLoaitaikhoan: 0,
                        AnhDaiDien: '',
                        HoTen:'',
                        DiaChi:'',
                        SoDienThoai:'',
                        status:3
                    }]
                },
                url: current_url + '/api/TaiKhoan/update-taikhoan',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Xoá chi tiết thành công')
                window.location='#!account/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi xoá', error);
            });
        }
    }
})