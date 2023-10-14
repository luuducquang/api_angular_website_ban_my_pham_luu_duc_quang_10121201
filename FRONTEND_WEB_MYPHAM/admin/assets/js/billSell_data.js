app.controller ('billSell', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("billSellCtrl", function ($scope, $http) {
    $scope.listHoaDonBan
    $scope.listHoaDonBanDetail
    $scope.pageSize=10
    $scope.Product

    var ngaytao = document.getElementById("party")
    var ngayduyet = document.getElementById("party2")

    ngaytao.value = gmt7ISODate;
    ngayduyet.value = gmt7ISODate;

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
            url: current_url + '/api/HoaDon/search-hoadonsingle',
        }).then(function (response) {  
            $scope.listHoaDonBan = response.data.data
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
                    a.href='#!billSell/'+a.innerHTML
                }
            }    
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    window.location='#!billSell/'+$scope.page
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    window.location='#!billSell/'+$scope.page
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
                url: current_url + '/api/HoaDon/delete-hoadon',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Xoá thành công')
                window.location='#!billSell/'+$scope.page
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
            url: current_url + '/api/HoaDon/getbyid-mahoadon-chitiethoadon/' + x.maHoaDon,
        }).then(function (response) {
            $scope.listHoaDonBanDetail=response.data
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
        $scope.trangthai = String(x.trangThai)
        ngaytao.value = x.ngayTao
        ngayduyet.value = x.ngayDuyet
        $scope.tonggia = x.tongGia
        $scope.tenkhach = x.tenKH
        $scope.email = x.email
        $scope.sodienthoai = x.sdt
        $scope.diachigiao = x.diaChiGiaoHang
        $scope.masanpham =""
        $scope.soluong =""
        $scope.gia =""
    }

    $scope.btnAdd=function(){
        $scope.tenkhach = ""
        $scope.tonggia = ""
        $scope.diachigiao = ""
        $scope.sodienthoai = ""
        $scope.diachigiao = ""
        $scope.soluong = ""
        $scope.gia = ""
        $scope.masanpham = ""
        $scope.trangthai = ""
        $scope.email = ""
        $(".detail").hide()
        $(".saveAdd").show()
    }

    $scope.addBill=function(){
        if($scope.tenkhach===""||$scope.tonggia===""||$scope.diachigiao===""||$scope.sodienthoai===""||
        $scope.diachigiao===""||$scope.soluong===""||$scope.gia===""||$scope.masanpham===""||$scope.trangthai===""){
            alert("Vui lòng điền đủ thông tin")
            return
        }
        $http({
            method: 'POST',
            data: {
                TrangThai: $scope.trangthai ==="true",
                NgayTao: ngaytao.value,
                NgayDuyet: ngayduyet.value,
                TongGia: $scope.tonggia,
                TenKH: $scope.tenkhach,
                DiaChi: $scope.diachigiao,
                Email: $scope.email,
                SDT: $scope.sodienthoai,
                DiaChiGiaoHang: $scope.diachigiao,
                list_json_chitiet_hoadon:[{
                    MaSanPham: $scope.masanpham,
                    SoLuong: $scope.soluong,
                    TongGia: $scope.gia
                }]
            },
            url: current_url + '/api/HoaDon/create-hoadon',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {  
            alert('Thêm thành công')
            window.location='#!billSell/'+$scope.page
        }).catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        });
    }

    $scope.refreshDetail=function(){
        $scope.masanpham =""
        $scope.soluong =""
        $scope.gia =""
        $scope.machitiethoadon=undefined
    }

    $scope.addDetail=function(){
        if($scope.soluong===""||$scope.gia===""||$scope.masanpham===""){
            alert("Vui lòng điền đủ thông tin")
            return
        }
        $http({
            method: 'PUT',
            data: {
                MaHoaDon:$scope.mahoadon,
                TrangThai: $scope.trangthai ==="true",
                NgayTao: ngaytao.value,
                NgayDuyet: ngayduyet.value,
                TongGia: $scope.tonggia,
                TenKH: $scope.tenkhach,
                DiaChi: $scope.diachigiao,
                Email: $scope.email,
                SDT: $scope.sodienthoai,
                DiaChiGiaoHang: $scope.diachigiao,
                list_json_chitiet_hoadon:[{
                    MaSanPham: $scope.masanpham,
                    SoLuong: $scope.soluong,
                    TongGia: $scope.gia,
                    status:1
                }]
            },
            url: current_url + '/api/HoaDon/update-hoadon',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {  
            alert('Thêm chi tiết thành công')
            window.location='#!billSell/'+$scope.page
        }).catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            console.log($scope.gia);
        });
    }

    $scope.machitiethoadon
    $scope.clicktoEdit=function(y){
        $scope.machitiethoadon = y.maChiTietHoaDon
        $scope.masanpham = String(y.maSanPham)
        $scope.soluong = y.soLuong
        $scope.gia = y.tongGia
    }

    $scope.editDetail=function(){
        if($scope.machitiethoadon){
            if($scope.soluong===null||$scope.gia===null||$scope.masanpham===""){
                alert("Vui lòng điền đủ thông tin")
                return
            }
            $http({
                method: 'PUT',
                data: {
                    MaHoaDon:$scope.mahoadon,
                    TrangThai: $scope.trangthai ==="true",
                    NgayTao: ngaytao.value,
                    NgayDuyet: ngayduyet.value,
                    TongGia: $scope.tonggia,
                    TenKH: $scope.tenkhach,
                    DiaChi: $scope.diachigiao,
                    Email: $scope.email,
                    SDT: $scope.sodienthoai,
                    DiaChiGiaoHang: $scope.diachigiao,
                    list_json_chitiet_hoadon:[{
                        MaChiTietHoaDon: $scope.machitiethoadon,
                        MaSanPham: $scope.masanpham,
                        SoLuong: $scope.soluong,
                        TongGia: $scope.gia,
                        status:2
                    }]
                },
                url: current_url + '/api/HoaDon/update-hoadon',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Sửa chi tiết thành công')
                window.location='#!billSell/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi sửa sản phẩm:', error);
            });
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaHoaDon:$scope.mahoadon,
                    TrangThai: $scope.trangthai ==="true",
                    NgayTao: ngaytao.value,
                    NgayDuyet: ngayduyet.value,
                    TongGia: $scope.tonggia,
                    TenKH: $scope.tenkhach,
                    DiaChi: $scope.diachigiao,
                    Email: $scope.email,
                    SDT: $scope.sodienthoai,
                    DiaChiGiaoHang: $scope.diachigiao,
                    list_json_chitiet_hoadon:[{
                        MaChiTietHoaDon: 0,
                        MaSanPham: 0,
                        SoLuong: 0,
                        TongGia: 0,
                        status:0
                    }]
                },
                url: current_url + '/api/HoaDon/update-hoadon',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Sửa chi tiết thành công')
                window.location='#!billSell/'+$scope.page
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
                    TrangThai: $scope.trangthai ==="true",
                    NgayTao: ngaytao.value,
                    NgayDuyet: ngayduyet.value,
                    TongGia: $scope.tonggia,
                    TenKH: $scope.tenkhach,
                    DiaChi: $scope.diachigiao,
                    Email: $scope.email,
                    SDT: $scope.sodienthoai,
                    DiaChiGiaoHang: $scope.diachigiao,
                    list_json_chitiet_hoadon:[{
                        MaChiTietHoaDon: $scope.machitiethoadon,
                        status:3
                    }]
                },
                url: current_url + '/api/HoaDon/update-hoadon',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Xoá chi tiết thành công')
                window.location='#!billSell/'+$scope.page
            }).catch(function (error) {
                console.error('Lỗi khi xoá sản phẩm:', error);
            });
        }
    }
})