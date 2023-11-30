app.controller ('importBill', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.start = $routeParams.start;
    $scope.valuestart = $routeParams.valuestart;
    $scope.end = $routeParams.end;
    $scope.valueend = $routeParams.valueend;
    $scope.npp = $routeParams.npp;
}]);

app.controller("importBillCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[3]).addClass('active_option')
    
    $scope.pageSize=10
    $scope.listHoaDonNhap
    $scope.NPP
    $scope.NameAcc
    $scope.Product
    $scope.listHoaDonNhapDetail

    var ngaytao = document.getElementById("party")
    ngaytao.value = gmt7ISODate;

    $scope.GetallNPP = function(){
        $http.get(current_url+'/api-admin/NhaPhanPhoi/get-all-nhaphanphoi')
        .then(function (response) {  
            $scope.NPP = response.data; 
        });
    }
    $scope.GetallNPP()

    $scope.GetallNameAcc = function(){
        $http.get(current_url+'/api-admin/TaiKhoan/get-alltaikhoan')
        .then(function (response) {  
            $scope.NameAcc = response.data; 
        });
    }
    $scope.GetallNameAcc()

    $scope.Getallproduct = function(){
        $http.get(current_url+'/api-admin/SanPham/get-allsanpham')
        .then(function (response) {  
            $scope.Product = response.data; 
        });
    }
    $scope.Getallproduct()

    $scope.GetBill= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: {
                page: $scope.page,
                pageSize: $scope.pageSize,
                fr_NgayTao: $scope.valuestart,
                to_NgayTao: $scope.valueend,
                NhaPhanPhoi: $scope.npp
            },
            url: current_url + '/api-admin/HoaDonNhap/search-hoadonnhapsingle',
        }).then(function (response) {  
            $scope.listHoaDonNhap = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetBill();

    //--------------------------------------------SEARCH------------------------------------//
    var ngaybatdau = document.getElementById("startdate")
    var ngayketthuc = document.getElementById("enddate")
    
    var ngayBatDau = new Date(gmt7Time);
    ngayBatDau.setMonth(ngayBatDau.getMonth() - 1);
    ngayBatDau = ngayBatDau.toISOString().slice(0, 16);
    ngaybatdau.value = ngayBatDau
    ngayketthuc.value = gmt7ISODate;

    $scope.start = "fr_NgayTao"
    $scope.end = "to_NgayTao"
    $scope.timkiem = $scope.npp
    if($scope.valuestart){
        ngaybatdau.value = $scope.valuestart
    }

    if($scope.valueend){
        ngayketthuc.value = $scope.valueend
    }

    $scope.search = function(){
        if(ngaybatdau.value>=ngayketthuc.value){
            alert('Ngày không hợp lệ')
            return
        }
        else{
            $scope.valuestart = ngaybatdau.value
            $scope.valueend = ngayketthuc.value
            if($scope.timkiem===undefined||$scope.timkiem===''){
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + _user.token },
                        data: {
                            page: 1,
                            pageSize: 10,
                            fr_NgayTao: $scope.valuestart,
                            to_NgayTao: $scope.valueend
                        },
                        url: current_url + '/api-admin/HoaDonNhap/search-hoadonnhapsingle',
                    }).then(function (response) {  
                        if(response.data.totalItems===0){
                            alert("Không có hoá đơn nào")
                            $scope.valuestart=''
                            $scope.valueend=''
                            return
                        }
                        else{
                            window.location='#!importBill/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                        }
                    }).catch(function (error) {
                        console.error('Lỗi :', error);
                    });
            }
            else{
                $scope.npp = $scope.timkiem
                var data = {
                    page: 1,
                    pageSize: 10,
                    fr_NgayTao: $scope.valuestart,
                    to_NgayTao: $scope.valueend,
                    NhaPhanPhoi: $scope.npp
                };
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + _user.token },
                    data: data,
                    url: current_url + '/api-admin/HoaDonNhap/search-hoadonnhapsingle',
                }).then(function (response) {  
                    console.log(response);
                    if(response.data.totalItems===0){
                        alert("Không có hoá đơn nào")
                        $scope.npp =''
                        $scope.valuestart=''
                        $scope.valueend=''
                        return
                    }
                    else{
                        window.location='#!importBill/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                    }
                }).catch(function (error) {
                    console.error('Lỗi :', error);
                });
            }
        }
    }
    //--------------------------------------------------------------------------------//
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
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                        window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                        window.location='#!importBill/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                        window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                        window.location='#!importBill/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                    window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                    window.location='#!importBill/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                    window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                    window.location='#!importBill/'+pageNumber
                }
                
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                    window.location='#!importBill/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                    window.location='#!importBill/'+pageNumber
                }
            }
        })
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
                url: current_url + '/api-admin/HoaDonNhap/delete-hoadonnhap',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                    window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                    window.location='#!importBill/'+$scope.page
                }
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
        $('.addimportBill').show()
        $scope.mahoadon = x.maHoaDon
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api-admin/HoaDonNhap/getbyid-mahoadon-chitiethoadonnhap/' + x.maHoaDon,
        }).then(function (response) {
            $scope.listHoaDonNhapDetail=response.data
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
        $scope.manhaphanphoi=String(x.maNhaPhanPhoi)
        ngaytao.value = x.ngayTao
        $scope.kieuthanhtoan = x.kieuThanhToan
        $scope.tongtien = x.tongTien.toLocaleString('de-DE')
        $scope.masanpham =""
        $scope.soluong =""
        $scope.donvitinh =""
        $scope.gianhap =""
        $scope.tonggia =""
        $scope.TongTienDataBase = x.tongTien
        $scope.tonggiasp = x.tongTien
        $(document).ready(function(){
            $('#manhaphanphoi').trigger('change');
            $('#kieuthanhtoan').trigger('change');
            $('#tensanpham').trigger('change');
            $('#tensanpham').prop('disabled', false);
            
        })
    }

    $scope.btnAdd=function(){ 
        $scope.masanpham =""
        $scope.soluong =""
        $scope.donvitinh =""
        $scope.gianhap =""
        $scope.tonggia =""
        $scope.tongtien =""
        $scope.mahoadon = ''
        $scope.mahoadon = ''
        ngaytao.value = gmt7ISODate
        $(".detail").hide()
        $(".saveAdd").show()
        $(document).ready(function(){
            $('#tensanpham').trigger('change');
            $('#tensanpham').prop('disabled', false);
        })
    }

    $scope.addBill=function(){
        if($scope.manhaphanphoi===""||
        $scope.kieuthanhtoan === ""||
        $scope.masanpham ===""||
        $scope.soluong ===""||
        $scope.donvitinh ===""||
        $scope.gianhap ===""||
        $scope.tonggia ===""
        ||$scope.soluong===0||$scope.soluong==="0"){
            alert("Vui lòng điền đủ thông tin")
            return
        }
        $http({
            method: 'POST',
            data: {
                MaNhaPhanPhoi: $scope.manhaphanphoi,
                NgayTao: ngaytao.value,
                KieuThanhToan: $scope.kieuthanhtoan,
                TongTien: Number(String($scope.tongtien).replace(/\./g, '')),
                MaTaiKhoan: _user.mataikhoan,
                list_json_chitiethoadonnhap:[{
                    MaSanPham: $scope.masanpham,
                    SoLuong: Number(String($scope.soluong).replace(/\./g, '')),
                    DonViTinh: $scope.donvitinh,
                    GiaNhap: Number(String($scope.gianhap).replace(/\./g, '')),
                    TongGia: Number(String($scope.tonggia).replace(/\./g, ''))
                }]
            },
            url: current_url + '/api-admin/HoaDonNhap/create-hoadonnhap',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {  
            alert('Thêm thành công')
            if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
            }
            if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
            }
            if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                window.location='#!importBill/'+$scope.page
            }
        }).catch(function (error) {
            console.error('Lỗi khi thêm :', error);
        });
    }

    $scope.refreshDetail=function(){
        $scope.masanpham =""
        $scope.soluong =""
        $scope.donvitinh =""
        $scope.gianhap =""
        $scope.tonggia =""
        $('.addimportBill').show()
        $scope.machitiethoadon=undefined
        $(document).ready(function(){
            $('#tensanpham').trigger('change');
            $('#tensanpham').prop('disabled', false);
        })
    }

    $scope.addDetail=function(){
        if($scope.masanpham ===""||
        $scope.soluong ===""||
        $scope.donvitinh ===""||
        $scope.gianhap ===""||
        $scope.tonggia ===""
        ||$scope.soluong===0||$scope.soluong==="0"){
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
                TongTien: Number(String($scope.tongtien).replace(/\./g, '')),
                list_json_chitiethoadonnhap:[{
                    MaSanPham: $scope.masanpham,
                    SoLuong: Number(String($scope.soluong).replace(/\./g, '')),
                    DonViTinh: $scope.donvitinh,
                    GiaNhap: Number(String($scope.gianhap).replace(/\./g, '')),
                    TongGia: Number(String($scope.tonggia).replace(/\./g, '')),
                    status:1
                }]
            },
            url: current_url + '/api-admin/HoaDonNhap/update-hoadonnhap',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {  
            alert('Thêm chi tiết thành công')
            if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
            }
            if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
            }
            if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                window.location='#!importBill/'+$scope.page
            }
        }).catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        });
    }

    $scope.machitiethoadon
    $scope.clicktoEdit=function(y){
        $scope.machitiethoadon = y.id
        $scope.masanpham = String(y.maSanPham)
        $scope.soluong = y.soLuong.toLocaleString('de-DE')
        $scope.donvitinh = y.donViTinh
        $scope.gianhap = y.giaNhap.toLocaleString('de-DE')
        $scope.tonggia = y.tongGia.toLocaleString('de-DE')
        $scope.giahientai = y.tongGia
        $scope.giachitietsp = y.tongGia
        $scope.soluongchitietcu = y.soLuong
        $('.addimportBill').hide()

        $(document).ready(function(){
            $('#tensanpham').trigger('change');
            $('#tensanpham').prop('disabled', true);
        })
        
        
    }

    $scope.editAmount = function() {
        if(!$scope.machitiethoadon){
            if(!$scope.mahoadon){
                $scope.tonggia = Number(String($scope.soluong).replace(/\./g, '')) * Number(String($scope.gianhap).replace(/\./g, ''));
                $scope.tonggia = $scope.tonggia.toLocaleString('de-DE')
                $scope.tongtien = $scope.tonggia.toLocaleString('de-DE')
            }
            else{
                $scope.tonggia = Number(String($scope.soluong).replace(/\./g, '')) * Number(String($scope.gianhap).replace(/\./g, ''));
                $scope.tonggia = $scope.tonggia.toLocaleString('de-DE')
                $scope.tongtien = Number($scope.TongTienDataBase) + Number(String($scope.tonggia).replace(/\./g, ''))
                $scope.tongtien = $scope.tongtien.toLocaleString('de-DE')
            }
        }
        else{
            $scope.tonggia = Number(String($scope.soluong).replace(/\./g, '')) * Number(String($scope.gianhap).replace(/\./g, ''));
            $scope.giasau = Number(String($scope.tonggia).replace(/\./g, '')) - Number($scope.giahientai);
            $scope.tongtien = Number($scope.TongTienDataBase) + Number(String($scope.giasau).replace(/\./g, ''));
            $scope.tonggia = $scope.tonggia.toLocaleString('de-DE')
            $scope.giasau = $scope.giasau.toLocaleString('de-DE')
            $scope.tongtien = $scope.tongtien.toLocaleString('de-DE')
        }
    }

    $scope.editPrice = function(){
        $scope.editAmount()
    }


    $scope.editDetail=function(){
        if($scope.machitiethoadon){
            if($scope.masanpham ===""||
                $scope.soluong ===null||
                $scope.donvitinh ===""||
                $scope.gianhap ===null||
                $scope.tonggia ===null
                ||$scope.soluong===0
                ||$scope.soluong==="0"
                ||$scope.soluong===""){
                alert("Vui lòng điền đủ thông tin")
                return
            }
            if(confirm("Bạn có muốn sửa thông tin hoá đơn nhập không !")){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:$scope.mahoadon,
                        MaNhaPhanPhoi: $scope.manhaphanphoi,
                        NgayTao: ngaytao.value,
                        KieuThanhToan: $scope.kieuthanhtoan,
                        TongTien: Number(String($scope.tongtien).replace(/\./g, '')),
                        list_json_chitiethoadonnhap:[{
                            Id:$scope.machitiethoadon,
                            MaSanPham: $scope.masanpham,
                            SoLuong: Number(String($scope.soluong).replace(/\./g, '')),
                            SoLuongTon: Number(Number(String($scope.soluong).replace(/\./g, '')) - Number(String($scope.soluongchitietcu).replace(/\./g, ''))),
                            DonViTinh: $scope.donvitinh,
                            GiaNhap: Number(String($scope.gianhap).replace(/\./g, '')),
                            TongGia: Number(String($scope.tonggia).replace(/\./g, '')),
                            status:2
                        }]
                    },
                    url: current_url + '/api-admin/HoaDonNhap/update-hoadonnhap',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                        window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                        window.location='#!importBill/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }
        }
        else{
            if(confirm("Bạn có muốn sửa thông tin hoá đơn nhập không !")){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:$scope.mahoadon,
                        MaNhaPhanPhoi: $scope.manhaphanphoi,
                        NgayTao: ngaytao.value,
                        KieuThanhToan: $scope.kieuthanhtoan,
                        TongTien: $scope.tonggiasp,
                        list_json_chitiethoadonnhap:[{
                            Id:0,
                            MaSanPham: 0,
                            SoLuong: 0,
                            DonViTinh: '',
                            GiaNhap: 0,
                            TongGia: 0,
                            status:0
                        }]
                    },
                    url: current_url + '/api-admin/HoaDonNhap/update-hoadonnhap',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                        window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                        window.location='#!importBill/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }
        }
    }

    $scope.deleteDetail=function(){
        if(!$scope.machitiethoadon){
            alert("Chưa chọn mục để xoá")
            return
        }
        else{
            if(confirm("Bạn có muốn xoá chi tiết hoá đơn nhập không !")){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:$scope.mahoadon,
                        MaNhaPhanPhoi: $scope.manhaphanphoi,
                        NgayTao: ngaytao.value,
                        KieuThanhToan: $scope.kieuthanhtoan,
                        TongTien: $scope.tonggiasp - Number($scope.giachitietsp),
                        list_json_chitiethoadonnhap:[{
                            Id:$scope.machitiethoadon,
                            MaSanPham: $scope.masanpham,
                            SoLuong: $scope.soluongchitietcu,
                            status:3
                        }]
                    },
                    url: current_url + '/api-admin/HoaDonNhap/update-hoadonNhap',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.npp){
                        window.location='#!importBill/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.npp
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.npp){
                        window.location='#!importBill/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi xoá sản phẩm:', error);
                });
            }
        }
    }

})