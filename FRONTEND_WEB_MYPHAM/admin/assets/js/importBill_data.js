app.controller ('importBill', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("importBillCtrl", function ($scope, $http) {
    $scope.pageSize=10
    $scope.listHoaDonNhap
    $scope.NPP
    $scope.NameAcc
    $scope.Product
    $scope.listHoaDonNhapDetail

    var ngaytao = document.getElementById("party")
    ngaytao.value = gmt7ISODate;

    $scope.GetallNPP = function(){
        $http.get(current_url+'/api/NhaPhanPhoi/get-all-nhaphanphoi')
        .then(function (response) {  
            $scope.NPP = response.data; 
        });
    }
    $scope.GetallNPP()

    $scope.GetallNameAcc = function(){
        $http.get(current_url+'/api/TaiKhoan/get-alltaikhoan')
        .then(function (response) {  
            $scope.NameAcc = response.data; 
        });
    }
    $scope.GetallNameAcc()

    $scope.Getallproduct = function(){
        $http.get(current_url+'/api/SanPham/get-allsanpham')
        .then(function (response) {  
            $scope.Product = response.data; 
        });
    }
    $scope.Getallproduct()

    $scope.GetBill= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: {
                page: $scope.page,
                pageSize: $scope.pageSize
            },
            url: current_url + '/api/HoaDonNhap/search-hoadonnhapsingle',
        }).then(function (response) {  
            $scope.listHoaDonNhap = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetBill();

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
                    a.href='#!importBill/'+a.innerHTML
                }
            }    
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    window.location='#!importBill/'+$scope.page
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    window.location='#!importBill/'+$scope.page
                }
            }
    }
    
    $scope.changePage=function(i) {
        $scope.page = i
    }

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maHoaDon);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maHoaDon);
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
                url: current_url + '/api/HoaDonNhap/delete-hoadonnhap',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Xoá thành công')
                window.location='#!importBill/'+$scope.page
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.mahoadon
    $scope.edit=function(x){
        $(".product-container").toggleClass("hide")
        $(".detail").show()
        $(".saveAdd").hide()
        $scope.mahoadon = x.maHoaDon
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api/HoaDonNhap/getbyid-mahoadon-chitiethoadonnhap/' + x.maHoaDon,
        }).then(function (response) {
            $scope.listHoaDonNhapDetail=response.data
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
        $scope.manhaphanphoi=String(x.maNhaPhanPhoi)
        ngaytao.value = x.ngayTao
        $scope.kieuthanhtoan = x.kieuThanhToan
        $scope.mataikhoan = String(x.maTaiKhoan)
        $scope.masanpham =""
        $scope.soluong =""
        $scope.donvitinh =""
        $scope.gianhap =""
        $scope.tongtien =""
    }

    $scope.btnAdd=function(){
        $scope.manhaphanphoi=""
        $scope.kieuthanhtoan = ""
        $scope.mataikhoan = ""
        $scope.masanpham =""
        $scope.soluong =""
        $scope.donvitinh =""
        $scope.gianhap =""
        $scope.tongtien =""
        $(".detail").hide()
        $(".saveAdd").show()
    }

    $scope.addBill=function(){
        if($scope.manhaphanphoi===""||
        $scope.kieuthanhtoan === ""||
        $scope.mataikhoan === ""||
        $scope.masanpham ===""||
        $scope.soluong ===""||
        $scope.donvitinh ===""||
        $scope.gianhap ===""||
        $scope.tongtien ===""){
            alert("Vui lòng điền đủ thông tin")
            return
        }
        $http({
            method: 'POST',
            data: {
                MaNhaPhanPhoi: $scope.manhaphanphoi,
                NgayTao: ngaytao.value,
                KieuThanhToan: $scope.kieuthanhtoan,
                MaTaiKhoan: $scope.mataikhoan,
                list_json_chitiethoadonnhap:[{
                    MaSanPham: $scope.masanpham,
                    SoLuong: $scope.soluong,
                    DonViTinh: $scope.donvitinh,
                    GiaNhap: $scope.gianhap,
                    TongTien: $scope.tongtien
                }]
            },
            url: current_url + '/api/HoaDonNhap/create-hoadonnhap',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {  
            alert('Thêm thành công')
            window.location='#!importBill/'+$scope.page
        }).catch(function (error) {
            console.error('Lỗi khi thêm :', error);
        });
    }

    $scope.refreshDetail=function(){
        $scope.masanpham =""
        $scope.soluong =""
        $scope.donvitinh =""
        $scope.gianhap =""
        $scope.tongtien =""
        $scope.machitiethoadon=undefined
    }

    $scope.addDetail=function(){
        if($scope.masanpham ===""||
        $scope.soluong ===""||
        $scope.donvitinh ===""||
        $scope.gianhap ===""||
        $scope.tongtien ===""){
            alert("Vui lòng điền đủ thông tin")
            return
        }
        $http({
            method: 'PUT',
            data: {
                MaHoaDon:$scope.mahoadon,
                MaNhaPhanPhoi: $scope.manhaphanphoi,
                NgayTao: ngaytao.value,
                KieuThanhToan: $scope.kieuthanhtoan,
                MaTaiKhoan: $scope.mataikhoan,
                list_json_chitiethoadonnhap:[{
                    MaSanPham: $scope.masanpham,
                    SoLuong: $scope.soluong,
                    DonViTinh: $scope.donvitinh,
                    GiaNhap: $scope.gianhap,
                    TongTien: $scope.tongtien,
                    status:1
                }]
            },
            url: current_url + '/api/HoaDonNhap/update-hoadonnhap',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {  
            alert('Thêm chi tiết thành công')
            window.location='#!importBill/'+$scope.page
        }).catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            console.log($scope.gia);
        });
    }

    $scope.machitiethoadon
    $scope.clicktoEdit=function(y){
        $scope.machitiethoadon = y.id
        $scope.masanpham = String(y.maSanPham)
        $scope.soluong = y.soLuong
        $scope.donvitinh = y.donViTinh
        $scope.gianhap = y.giaNhap
        $scope.tongtien = y.tongTien
    }

    $scope.editDetail=function(){
        if($scope.machitiethoadon){
            if($scope.masanpham ===""||
                $scope.soluong ===null||
                $scope.donvitinh ===""||
                $scope.gianhap ===null||
                $scope.tongtien ===null){
                alert("Vui lòng điền đủ thông tin")
                return
            }
            $http({
                method: 'PUT',
                data: {
                    MaHoaDon:$scope.mahoadon,
                    MaNhaPhanPhoi: $scope.manhaphanphoi,
                    NgayTao: ngaytao.value,
                    KieuThanhToan: $scope.kieuthanhtoan,
                    MaTaiKhoan: $scope.mataikhoan,
                    list_json_chitiethoadonnhap:[{
                        Id:$scope.machitiethoadon,
                        MaSanPham: $scope.masanpham,
                        SoLuong: $scope.soluong,
                        DonViTinh: $scope.donvitinh,
                        GiaNhap: $scope.gianhap,
                        TongTien: $scope.tongtien,
                        status:2
                    }]
                },
                url: current_url + '/api/HoaDonNhap/update-hoadonnhap',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Sửa chi tiết thành công')
                window.location='#!importBill/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi sửa sản phẩm:', error);
                console.log($scope.donvitinh);
            });
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaHoaDon:$scope.mahoadon,
                    MaNhaPhanPhoi: $scope.manhaphanphoi,
                    NgayTao: ngaytao.value,
                    KieuThanhToan: $scope.kieuthanhtoan,
                    MaTaiKhoan: $scope.mataikhoan,
                    list_json_chitiethoadonnhap:[{
                        Id:0,
                        MaSanPham: 0,
                        SoLuong: 0,
                        DonViTinh: '',
                        GiaNhap: 0,
                        TongTien: 0,
                        status:0
                    }]
                },
                url: current_url + '/api/HoaDonNhap/update-hoadonnhap',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Sửa chi tiết thành công')
                window.location='#!importBill/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi sửa sản phẩm:', error);
            });
        }
    }

    $scope.deleteDetail=function(){
        if(!$scope.machitiethoadon){
            alert("Chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaHoaDon:$scope.mahoadon,
                    MaNhaPhanPhoi: $scope.manhaphanphoi,
                    NgayTao: ngaytao.value,
                    KieuThanhToan: $scope.kieuthanhtoan,
                    MaTaiKhoan: $scope.mataikhoan,
                    list_json_chitiethoadonnhap:[{
                        Id:$scope.machitiethoadon,
                        status:3
                    }]
                },
                url: current_url + '/api/HoaDonNhap/update-hoadonNhap',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Xoá chi tiết thành công')
                window.location='#!importBill/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi xoá sản phẩm:', error);
            });
        }
    }
})