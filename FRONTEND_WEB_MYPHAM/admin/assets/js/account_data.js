app.controller ('account', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.key = $routeParams.key;
    $scope.value = $routeParams.value;
}]);

app.controller("AccountCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[13]).addClass('active_option')


	$scope.listAccount;	
    $scope.pageSize=10
    $scope.Image
    $scope.MaAccount
    $scope.listTypeAccount
    $scope.listloaitk
    $scope.listTaiKhoanDetail
    $scope.Image

    var datas = {
        page: $scope.page,
        pageSize: $scope.pageSize
    }
    datas[$scope.key] = $scope.value

    $scope.GetallLoaiTK = function(){
        $http.get(current_url+'/api-admin/LoaiTaiKhoan/get_all_loaitaikhoan')
        .then(function (response) {  
            $scope.listloaitk = response.data; 
        });
    }
    $scope.GetallLoaiTK()

    $scope.GetTypeAccount= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-admin/TaiKhoan/search-taikhoan',
        }).then(function (response) {  
            $scope.listAccount = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetTypeAccount();
    //------------------------------------------------------------------------------//
    $scope.timkiem = $scope.value
    $scope.luachontimkiem = $scope.key

    $scope.search = function(){
        if((!$scope.timkiem&&!$scope.luachontimkiem)||(!$scope.timkiem&&$scope.luachontimkiem)){
            window.location='#!account/1'
        }
        else if($scope.timkiem&&!$scope.luachontimkiem){
            $scope.key = 'TenTaiKhoan'
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
                    url: current_url + '/api-admin/TaiKhoan/search-taikhoan',
                }).then(function (response) {  
                    if(response.data.totalItems===0){
                        alert("Không có tài khoản nào")
                        $scope.key =''
                        $scope.value =''
                        return
                    }
                    else{
                        window.location='#!account/1/'+$scope.key+'/'+$scope.value
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
                    url: current_url + '/api-admin/TaiKhoan/search-taikhoan',
                }).then(function (response) {  
                    if(response.data.totalItems===0){
                        alert("Không có tài khoản nào")
                        $scope.key =''
                        $scope.value =''
                        return
                    }
                    else{
                        window.location='#!account/1/'+$scope.key+'/'+$scope.value
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
                        window.location.href='#!account/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location.href='#!account/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.key&&$scope.value){
                        window.location.href='#!account/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location.href='#!account/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.key&&$scope.value){
                    window.location.href='#!account/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location.href='#!account/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.key&&$scope.value){
                    window.location.href='#!account/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location.href='#!account/'+pageNumber
                }
                
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.key&&$scope.value){
                    window.location.href='#!account/'+pageNumber+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location.href='#!account/'+pageNumber
                }
            }
        })
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
                url: current_url + '/api-admin/TaiKhoan/delete-taikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                if($scope.key&&$scope.value){
                    window.location='#!account/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!account/'+$scope.page
                }
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
        $('.addDetailAccount').show()
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api-admin/TaiKhoan/getbyid-taikhoan-chitiettaikhoan/' + x.maTaiKhoan,
        }).then(function (response) {
            if(response.data.length<=1){
                $('.deleteDetailAccount').hide()
            }
            else{
                $('.deleteDetailAccount').show()
            }
            $scope.listTaiKhoanDetail=response.data
            console.log();
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
        $scope.mataikhoan = x.maTaiKhoan
        $scope.tentaikhoan = x.tenTaiKhoan
        $scope.matkhau = x.matKhau
        $scope.email = x.email
        $scope.loaitaikhoan = ""
        $scope.anhdaidien = ""
        $scope.hoten = ""
        $scope.diachi = ""
        $scope.sodienthoai = ""
        preview.src=''
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
        preview.src=''
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
                url: current_url + '/api-admin/Image/upload',
            }).then(function (res) {
                $scope.Image = res.data.filePath;
                preview.src = "../img"+ $scope.Image
                $http({
                    method: 'POST',
                    data: {
                        TenTaiKhoan: $scope.tentaikhoan,
                        MatKhau: $scope.matkhau,
                        Email: $scope.email,
                        list_json_chitiet_taikhoan:[{
                            MaLoaitaikhoan: $scope.loaitaikhoan,
                            AnhDaiDien: "../img"+$scope.Image,
                            HoTen:$scope.hoten,
                            DiaChi:$scope.diachi,
                            SoDienThoai:$scope.sodienthoai
                        }]
                    },
                    url: current_url + '/api-admin/TaiKhoan/create-taikhoan',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
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
                        AnhDaiDien: "../img"+$scope.Image,
                        HoTen:$scope.hoten,
                        DiaChi:$scope.diachi,
                        SoDienThoai:$scope.sodienthoai
                    }]
                },
                url: current_url + '/api-admin/TaiKhoan/create-taikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Thêm thành công')
                if($scope.key&&$scope.value){
                    window.location='#!account/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!account/'+$scope.page
                }
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
        $('.addDetailAccount').show()
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
                url: current_url + '/api-admin/Image/upload',
            }).then(function (res) {
                $scope.Image = res.data.filePath;
                preview.src = "../img"+ $scope.Image
                $http({
                    method: 'PUT',
                    data: {
                        MaTaiKhoan:$scope.mataikhoan,
                        TenTaiKhoan: $scope.tentaikhoan,
                        MatKhau: $scope.matkhau,
                        Email: $scope.email,
                        list_json_chitiet_taikhoan:[{
                            MaLoaitaikhoan: $scope.loaitaikhoan,
                            AnhDaiDien: "../img"+$scope.Image,
                            HoTen:$scope.hoten,
                            DiaChi:$scope.diachi,
                            SoDienThoai:$scope.sodienthoai,
                            status:1
                        }]
                    },
                    url: current_url + '/api-admin/TaiKhoan/update-taikhoan',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    alert('Thêm chi tiết thành công')
                    if($scope.key&&$scope.value){
                        window.location='#!account/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location='#!account/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
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
                        AnhDaiDien: "../img"+$scope.Image,
                        HoTen:$scope.hoten,
                        DiaChi:$scope.diachi,
                        SoDienThoai:$scope.sodienthoai,
                        status:1
                    }]
                },
                url: current_url + '/api-admin/TaiKhoan/update-taikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Thêm thành công')
                if($scope.key&&$scope.value){
                    window.location='#!account/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                }
                else{
                    window.location='#!account/'+$scope.page
                }
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
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
        $('.addDetailAccount').hide()
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
                    url: current_url + '/api-admin/Image/upload',
                }).then(function (res) {
                    $scope.Image = res.data.filePath;
                    preview.src = "../img"+ $scope.Image
                    if(confirm("Bạn có muốn sửa chi tiết tài khoản không !")){
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
                                    AnhDaiDien: "../img"+$scope.Image,
                                    HoTen:$scope.hoten,
                                    DiaChi:$scope.diachi,
                                    SoDienThoai:$scope.sodienthoai,
                                    status:2
                                }]
                            },
                            url: current_url + '/api-admin/TaiKhoan/update-taikhoan',
                            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                        }).then(function (response) {  
                            if($scope.key&&$scope.value){
                                window.location='#!account/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                            }
                            else{
                                window.location='#!account/'+$scope.page
                            }
                        }).catch(function (error) {
                            console.error('Lỗi khi thêm sản phẩm:', error);
                            console.log($scope.gia);
                        });
                    }
                });
            }
            else{
                if(confirm("Bạn có muốn sửa chi tiết tài khoản không !")){
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
                        url: current_url + '/api-admin/TaiKhoan/update-taikhoan',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        if($scope.key&&$scope.value){
                            window.location='#!account/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                        }
                        else{
                            window.location='#!account/'+$scope.page
                        }
                    }).catch(function (error) {
                        console.error('Lỗi khi thêm sản phẩm:', error);
                        console.log($scope.gia);
                    });
                }
            }
        }
        else{
            if(confirm("Bạn có muốn sửa thông tin tài khoản không !")){
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
                    url: current_url + '/api-admin/TaiKhoan/update-taikhoan',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    if($scope.key&&$scope.value){
                        window.location='#!account/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location='#!account/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                    console.log($scope.gia);
                });
            }
        }
    }

    $scope.deleteDetail=function(){
        if(!$scope.machitiettaikhoan){
            alert("Chưa chọn mục để xoá")
            return
        }
        else{
            if(confirm("Bạn có muốn xoá chi tiết tài khoản không !")){
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
                    url: current_url + '/api-admin/TaiKhoan/update-taikhoan',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    if($scope.key&&$scope.value){
                        window.location='#!account/'+$scope.page+'/'+$scope.key+'/'+$scope.value
                    }
                    else{
                        window.location='#!account/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi xoá', error);
                });
            }
        }
    }
})