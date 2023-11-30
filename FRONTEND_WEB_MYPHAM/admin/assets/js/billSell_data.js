app.controller ('billSell', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.start = $routeParams.start;
    $scope.valuestart = $routeParams.valuestart;
    $scope.end = $routeParams.end;
    $scope.valueend = $routeParams.valueend;
    $scope.key = $routeParams.key;
    $scope.value = $routeParams.value;
}]);

app.controller("billSellCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[2]).addClass('active_option')
    
    $scope.listHoaDonBan
    $scope.listHoaDonBanDetail
    $scope.pageSize=10
    $scope.Product

    var ngaytao = document.getElementById("party")

    ngaytao.value = gmt7ISODate;

    $scope.Getallproduct = function(){
        $http.get(current_url+'/api-admin/SanPham/get-allsanpham')
        .then(function (response) {  
            $scope.Product = response.data; 
        });
    }
    $scope.Getallproduct()

    $scope.changeProductDetail = function(){
        if($scope.masanpham){
            $http.get(current_url+'/api-admin/SanPham/getbyid-sanpham/'+$scope.masanpham)
            .then(function (response) {  
                $scope.ProductDetail = response.data; 
                $scope.dongia = $scope.ProductDetail.giaGiam.toLocaleString('De-de');
                $scope.soluongtonkho = $scope.ProductDetail.soLuong;
                $scope.editAmount()
            });
        }
    }

    var datas = {
        page: $scope.page,
        pageSize: $scope.pageSize,
        fr_NgayTao: $scope.valuestart,
        to_NgayTao: $scope.valueend
    }
    datas[$scope.key] = $scope.value

    $scope.GetBill= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-admin/HoaDon/search-hoadonsingle',
        }).then(function (response) {  
            $scope.listHoaDonBan = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetBill();

    //---------------------------SEARCH------------------------------------//
    var ngaybatdau = document.getElementById("startdate")
    var ngayketthuc = document.getElementById("enddate")
    
    var ngayBatDau = new Date(gmt7Time);
    ngayBatDau.setMonth(ngayBatDau.getMonth() - 1);
    ngayBatDau = ngayBatDau.toISOString().slice(0, 16);
    ngaybatdau.value = ngayBatDau
    ngayketthuc.value = gmt7ISODate;

    $scope.start = "fr_NgayTao"
    $scope.end = "to_NgayTao"

    $scope.timkiem = $scope.value
    $scope.luachontimkiem = $scope.key

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
            if((!$scope.timkiem&&!$scope.luachontimkiem)||(!$scope.timkiem&&$scope.luachontimkiem)){
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + _user.token },
                        data: {
                            page: 1,
                            pageSize: 10,
                            fr_NgayTao: $scope.valuestart,
                            to_NgayTao: $scope.valueend
                        },
                        url: current_url + '/api-admin/HoaDon/search-hoadonsingle',
                    }).then(function (response) {  
                        if(response.data.totalItems===0){
                            alert("Không có hoá đơn nào")
                            $scope.valuestart=''
                            $scope.valueend=''
                            return
                        }
                        else{
                            window.location='#!billSell/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                        }
                    }).catch(function (error) {
                        console.error('Lỗi :', error);
                    });
            }
            else if($scope.timkiem&&!$scope.luachontimkiem){
                    $scope.key = 'TenKH'
                    $scope.value = $scope.timkiem
                    
                    var data = {
                        page: 1,
                        pageSize: 10,
                        fr_NgayTao: $scope.valuestart,
                        to_NgayTao: $scope.valueend
                    };
                    data[$scope.key] = $scope.value
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + _user.token },
                        data: data,
                        url: current_url + '/api-admin/HoaDon/search-hoadonsingle',
                    }).then(function (response) {  
                        if(response.data.totalItems===0){
                            alert("Không có hoá đơn nào")
                            $scope.key =''
                            $scope.value =''
                            $scope.valuestart=''
                            $scope.valueend=''
                            return
                        }
                        else{
                            window.location='#!billSell/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
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
                    pageSize: 10,
                    fr_NgayTao: $scope.valuestart,
                    to_NgayTao: $scope.valueend
                };
                data[$scope.key] = $scope.value
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + _user.token },
                    data: data,
                    url: current_url + '/api-admin/HoaDon/search-hoadonsingle',
                }).then(function (response) {  
                    if(response.data.totalItems===0){
                        alert("Không có hoá đơn nào")
                        $scope.key =''
                        $scope.value =''
                        $scope.valuestart=''
                        $scope.valueend=''
                        return
                    }
                    else{
                        window.location='#!billSell/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                    }
                }).catch(function (error) {
                    console.error('Lỗi :', error);
                });
            }
        }
    }
    //---------------------------------------------------------------//
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
                        window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                        window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                        window.location='#!billSell/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                        window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                        window.location='#!billSell/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                    window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                    window.location='#!billSell/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                    window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                    window.location='#!billSell/'+pageNumber
                }
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                    window.location='#!billSell/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                    window.location='#!billSell/'+pageNumber
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
                url: current_url + '/api-admin/HoaDon/delete-hoadon',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                    window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                    window.location='#!billSell/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.mahoadon
    $scope.edit=function(x){
        if(x.trangThai==="Huỷ đơn"){
            $('.refreshDetailProduct').hide()
            $('.addDetailProduct').hide()
            $('.editDetaolProduct').hide()
            $('.deleteDetaolProduct').hide()
        }
        else{
            $('.refreshDetailProduct').show()
            $('.addDetailProduct').show()
            $('.editDetaolProduct').show()
            $('.deleteDetaolProduct').show()
        }
        
        $(document).ready(function(){
            $('#tensanpham').trigger('change');
        })
        $(".product-container").toggleClass("hide")
        $(".detail").show()
        $(".saveAdd").hide()
        $scope.mahoadon = x.maHoaDon
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api-admin/HoaDon/getbyid-mahoadon-chitiethoadon/' + x.maHoaDon,
        }).then(function (response) {
            $scope.listHoaDonBanDetail=response.data
            $scope.listHDBDetailDelete = $scope.listHoaDonBanDetail.map(function(value){
                return {MaChiTietHoaDon: value.maChiTietHoaDon,
                    MaSanPham: value.maSanPham,
                    SoLuongTon: value.soLuong,
                    Status:4}
            })
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
        $scope.trangthai = String(x.trangThai)
        ngaytao.value = x.ngayTao
        $scope.tonggia = x.tongGia.toLocaleString('De-de')
        $scope.tenkhach = x.tenKH
        $scope.email = x.email
        $scope.sodienthoai = x.sdt
        $scope.diachigiao = x.diaChiGiaoHang
        $scope.masanpham =""
        $scope.soluong =""
        $scope.gia =""
        $scope.dongia=""
        $scope.TonggiaDataBase = x.tongGia
        $scope.tonggiachitietsp = x.tongGia
        $('#statusOption').prop('disabled',false);
    }

    $scope.export=function(x){
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api-admin/HoaDon/getbyid-mahoadon-chitiethoadon/' + x.maHoaDon,
        }).then(function (response) {
            $scope.listexport = response.data.map((value)=>({...value}))
            const listExportInvoice = localStorage.getItem('listExportInvoice') ? JSON.parse(localStorage.getItem('listExportInvoice')) : {}

            listExportInvoice.ngaymua = x.ngayTao;
            listExportInvoice.mahoadon = x.maHoaDon;
            listExportInvoice.tenkhachhang = x.tenKH;
            listExportInvoice.sdt = x.sdt;
            listExportInvoice.diachi2 = x.diachi;
            listExportInvoice.tongtien = x.tongGia;
            listExportInvoice.diachi1 = x.diaChiGiaoHang;
            listExportInvoice.listitem = $scope.listexport;

            localStorage.setItem('listExportInvoice',JSON.stringify(listExportInvoice))
            // var props = {
            //     outputType: jsPDFInvoiceTemplate.OutputType.Save,
            //     returnJsPDFDocObject: true,
            //     fileName: "Invoice 2021",
            //     orientationLandscape: false,
            //     compress: true,
            //     logo: {
            //         src: "",
            //         type: 'PNG', //optional, when src= data:uri (nodejs case)
            //         width: 53.33, //aspect ratio = width/height
            //         height: 26.66,
            //         margin: {
            //             top: 0, //negative or positive num, from the current position
            //             left: 0 //negative or positive num, from the current position
            //         }
            //     },
            //     stamp: {
            //         inAllPages: true, //by default = false, just in the last page
            //         src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            //         type: 'JPG', //optional, when src= data:uri (nodejs case)
            //         width: 20, //aspect ratio = width/height
            //         height: 20,
            //         margin: {
            //             top: 0, //negative or positive num, from the current position
            //             left: 0 //negative or positive num, from the current position
            //         }
            //     },
            //     business: {
            //         name: "SkinCareComestic",
            //         address: "HungYen,TienLu,HungDao",
            //         phone: "0123456789",
            //         email: "luuquang203@gmail.com",
            //         email_1: "skincare.com.vn",
            //     },
            //     contact: {
            //         label: "Ten khach hang : "+x.tenKH,
            //         name: "Dia chi : "+x.diaChiGiaoHang,
            //         address: "So dien thoai : "+x.sdt,
            //         phone: "Tong gia : "+x.tongGia.toLocaleString('De-de')
            //     },
            //     invoice: {
            //         label: "Hoa Don: ",
            //         num: x.maHoaDon,
            //         invGenDate: 'Ngay Tao : '+x.ngayTao,
            //         headerBorder: false,
            //         tableBodyBorder: false,
            //         header: [
            //         {
            //             title: "Ma san pham"
            //         }, 
            //         { 
            //             title: "Ten san pham"
            //         }, 
            //         { 
            //             title: "So luong"
            //         }, 
            //         { title: "Don Gia"},
            //         { title: "TongGia"}
            //         ],
            //         table: $scope.listexport,
            //         additionalRows: [{
            //             col1: 'Total:',
            //             col2: '145,250.50',
            //             col3: 'ALL',
            //             style: {
            //                 fontSize: 14 //optional, default 12
            //             }
            //         },
            //         {
            //             col1: 'VAT:',
            //             col2: '20',
            //             col3: '%',
            //             style: {
            //                 fontSize: 10 //optional, default 12
            //             }
            //         },
            //         {
            //             col1: 'SubTotal:',
            //             col2: '116,199.90',
            //             col3: 'ALL',
            //             style: {
            //                 fontSize: 10 //optional, default 12
            //             }
            //         }]
            //     },
            //     footer: {
            //         text: "Thank you for buy.",
            //     },
            //     pageEnable: false,
            //     pageLabel: "Page",
            // };
            // if(confirm('Bạn có muốn xuất hoá đơn không')){
            //     var pdfObject = jsPDFInvoiceTemplate.default(props);
            // }
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
    }

    $scope.btnAdd=function(){
        $scope.tenkhach = ""
        $scope.tonggia = Number(30000).toLocaleString('De-de')
        $scope.diachigiao = ""
        $scope.sodienthoai = ""
        $scope.diachigiao = ""
        $scope.soluong = ""
        $scope.gia = ""
        $scope.dongia=""
        $scope.masanpham = ""
        $scope.trangthai = "Đang xử lý"
        $scope.email = ""
        $scope.mahoadon=""
        $scope.machitiethoadon=""
        ngaytao.value = gmt7ISODate;
        $(".detail").hide()
        $(".saveAdd").show()
        $('#statusOption').prop('disabled',true);
        $(document).ready(function(){
            $('#tensanpham').trigger('change');
        })
        
    }

    $scope.addBill=function(){
        if($scope.tenkhach===""||$scope.tonggia===""||$scope.diachigiao===""||$scope.sodienthoai===""||
        $scope.diachigiao===""||$scope.soluong===""||$scope.gia===""||$scope.masanpham===""||$scope.trangthai===""||$scope.dongia===""
        ||$scope.soluong===0||$scope.soluong==="0"){
            alert("Vui lòng điền đủ thông tin")
            return
        }
        if($scope.soluongtonkho >= Number(String($scope.soluong).replace(/\./g, ''))){
            $http({
                method: 'POST',
                data: {
                    TrangThai: $scope.trangthai,
                    NgayTao: ngaytao.value,
                    TongGia: String($scope.tonggia).replace(/\./g, ''),
                    TenKH: $scope.tenkhach,
                    DiaChi: $scope.diachigiao,
                    Email: $scope.email,
                    SDT: $scope.sodienthoai,
                    DiaChiGiaoHang: $scope.diachigiao,
                    MaTaiKhoan: _user.mataikhoan,
                    list_json_chitiet_hoadon:[{
                        MaSanPham: $scope.masanpham,
                        SoLuong: String($scope.soluong).replace(/\./g, ''),
                        DonGia: String($scope.dongia).replace(/\./g, ''),
                        TongGia: String($scope.gia).replace(/\./g, '')
                    }]
                },
                url: current_url + '/api-admin/HoaDon/create-hoadon',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Thêm thành công')
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                    window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                    window.location='#!billSell/'+$scope.page
                }
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            });
        }if($scope.soluongtonkho < Number(String($scope.soluong).replace(/\./g, ''))){
            alert('Số lượng trong kho không đủ')
            return
        }
    }

    $scope.refreshDetail=function(){
        $scope.masanpham =""
        $scope.soluong =""
        $scope.gia =""
        $scope.dongia=""
        $scope.machitiethoadon=undefined
        $('.addDetailProduct').show()
        $(document).ready(function(){
            $('#tensanpham').trigger('change');
            $('#tensanpham').prop('disabled',false);
        })
    }

    $scope.addDetail=function(){
        if($scope.soluong===""||$scope.gia===""||$scope.masanpham===""
        ||$scope.soluong===0||$scope.soluong==="0"){
            alert("Vui lòng điền đủ thông tin")
            return
        }
        if($scope.soluongtonkho >= Number(String($scope.soluong).replace(/\./g, ''))){
            $http({
                method: 'PUT',
                data: {
                    MaHoaDon:$scope.mahoadon,
                    TrangThai: $scope.trangthai,
                    NgayTao: ngaytao.value,
                    TongGia: String($scope.tonggia).replace(/\./g, ''),
                    TenKH: $scope.tenkhach,
                    DiaChi: $scope.diachigiao,
                    Email: $scope.email,
                    SDT: $scope.sodienthoai,
                    DiaChiGiaoHang: $scope.diachigiao,
                    list_json_chitiet_hoadon:[{
                        MaSanPham: $scope.masanpham,
                        SoLuong: String($scope.soluong).replace(/\./g, ''),
                        SoLuongTon: String($scope.soluong).replace(/\./g, ''),
                        DonGia: String($scope.dongia).replace(/\./g, ''),
                        TongGia: String($scope.gia).replace(/\./g, ''),
                        status:1
                    }]
                },
                url: current_url + '/api-admin/HoaDon/update-hoadon',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                alert('Thêm chi tiết thành công')
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                    window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                    window.location='#!billSell/'+$scope.page
                }
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
                console.log($scope.gia);
            });
        }
        if($scope.soluongtonkho < Number(String($scope.soluong).replace(/\./g, ''))){
            alert('Số lượng trong kho không đủ')
            return
        }
    }

    $scope.machitiethoadon
    $scope.clicktoEdit=function(y){
        $scope.machitiethoadon = y.maChiTietHoaDon
        $scope.masanpham = String(y.maSanPham)
        $scope.soluong = y.soLuong.toLocaleString('De-de')
        $scope.dongia = y.donGia.toLocaleString('De-de')
        $scope.gia = y.tongGia.toLocaleString('De-de')
        $scope.giahientai = y.tongGia
        $scope.tonggia = $scope.TonggiaDataBase.toLocaleString('De-de') 
        $scope.giachitietsp = y.tongGia
        $scope.soluongchitietcu = y.soLuong
        $('.addDetailProduct').hide()
        
        $(document).ready(function(){
            $('#tensanpham').trigger('change');
            $('#tensanpham').prop('disabled',true);
        })

        $http.get(current_url+'/api-admin/SanPham/getbyid-sanpham/'+String(y.maSanPham))
            .then(function (response) {  
                $scope.soluongtonkhochitiet = response.data.soLuong
            });
        
    }

    $scope.editAmount = function() {
        if(!$scope.machitiethoadon){
            if(!$scope.mahoadon){
                $scope.gia = Number(String($scope.soluong).replace(/\./g, '')) * Number(String($scope.dongia).replace(/\./g, ''));
                $scope.tonggia = Number($scope.gia)  + Number(30000)
                $scope.gia = $scope.gia.toLocaleString('De-de')
                $scope.tonggia = $scope.tonggia.toLocaleString('De-de')
            }
            else{
                $scope.gia = Number(String($scope.soluong).replace(/\./g, '')) * Number(String($scope.dongia).replace(/\./g, ''));
                $scope.gia = $scope.gia.toLocaleString('De-de')
                $scope.tonggia = Number(String($scope.TonggiaDataBase).replace(/\./g, '')) + Number(String($scope.gia).replace(/\./g, ''))
                $scope.tonggia = $scope.tonggia.toLocaleString('De-de')
            }
        }
        else{
            $scope.gia = Number(String($scope.soluong).replace(/\./g, '')) * Number(String($scope.dongia).replace(/\./g, ''));
            $scope.gia = $scope.gia.toLocaleString('De-de')
            $scope.giasau = Number(String($scope.gia).replace(/\./g, '')) - Number(String($scope.giahientai).replace(/\./g, ''));
            $scope.giasau = $scope.giasau.toLocaleString('De-de')
            $scope.tonggia = Number(String($scope.TonggiaDataBase).replace(/\./g, '')) + Number(String($scope.giasau).replace(/\./g, ''))
            $scope.tonggia = $scope.tonggia.toLocaleString('De-de')
        }
    }
    


    $scope.editDetail=function(){
        if($scope.machitiethoadon){
            if($scope.soluong===null||$scope.gia===null||$scope.masanpham===""
            ||$scope.soluong===0||$scope.soluong==="0"||$scope.soluong===""){
                alert("Vui lòng điền đủ thông tin")
                return
            }
            if($scope.trangthai==="Huỷ đơn"){
                if(confirm('Bạn có muốn huỷ đơn hàng không?')){
                    $http({
                        method: 'PUT',
                        data: {
                            MaHoaDon:$scope.mahoadon,
                            TrangThai: $scope.trangthai,
                            NgayTao: ngaytao.value,
                            TongGia: $scope.tonggiachitietsp,
                            TenKH: $scope.tenkhach,
                            DiaChi: $scope.diachigiao,
                            Email: $scope.email,
                            SDT: $scope.sodienthoai,
                            DiaChiGiaoHang: $scope.diachigiao,
                            list_json_chitiet_hoadon:$scope.listHDBDetailDelete
                        },
                        url: current_url + '/api-admin/HoaDon/update-hoadon',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                            window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                        }
                        if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                            window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                        }
                        if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                            window.location='#!billSell/'+$scope.page
                        }
                    }).catch(function (error) {
                        console.error('Lỗi khi xoá sản phẩm:', error);
                    });
                }
            }
            else{
                if($scope.soluongtonkhochitiet >= Number($scope.soluong - $scope.soluongchitietcu)){
                    if(confirm('Bạn có muốn sửa chi tiết đơn hàng không?')){
                        $http({
                            method: 'PUT',
                            data: {
                                MaHoaDon:$scope.mahoadon,
                                TrangThai: $scope.trangthai,
                                NgayTao: ngaytao.value,
                                TongGia: String($scope.tonggia).replace(/\./g, ''),
                                TenKH: $scope.tenkhach,
                                DiaChi: $scope.diachigiao,
                                Email: $scope.email,
                                SDT: $scope.sodienthoai,
                                DiaChiGiaoHang: $scope.diachigiao,
                                list_json_chitiet_hoadon:[{
                                    MaChiTietHoaDon: $scope.machitiethoadon,
                                    MaSanPham: $scope.masanpham,
                                    SoLuong: String($scope.soluong).replace(/\./g, ''),
                                    SoLuongTon: Number(String($scope.soluong).replace(/\./g, '') - $scope.soluongchitietcu),
                                    DonGia: String($scope.dongia).replace(/\./g, ''),
                                    TongGia: String($scope.gia).replace(/\./g, ''),
                                    status:2
                                }]
                            },
                            url: current_url + '/api-admin/HoaDon/update-hoadon',
                            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                        }).then(function (response) {  
                            if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                                window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                            }
                            if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                                window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                            }
                            if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                                window.location='#!billSell/'+$scope.page
                            }
                        }).catch(function (error) {
                            console.error('Lỗi khi sửa sản phẩm:', error);
                        });
                    }
                }
                else{
                    alert('Số lượng trong kho không đủ')
                    return
                }
            }
        }
        else{
            if($scope.trangthai==="Huỷ đơn"){
                if(confirm('Bạn có muốn huỷ đơn hàng không?')){
                    $http({
                        method: 'PUT',
                        data: {
                            MaHoaDon:$scope.mahoadon,
                            TrangThai: $scope.trangthai,
                            NgayTao: ngaytao.value,
                            TongGia: $scope.tonggiachitietsp,
                            TenKH: $scope.tenkhach,
                            DiaChi: $scope.diachigiao,
                            Email: $scope.email,
                            SDT: $scope.sodienthoai,
                            DiaChiGiaoHang: $scope.diachigiao,
                            list_json_chitiet_hoadon:$scope.listHDBDetailDelete
                        },
                        url: current_url + '/api-admin/HoaDon/update-hoadon',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                            window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                        }
                        if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                            window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                        }
                        if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                            window.location='#!billSell/'+$scope.page
                        }
                    }).catch(function (error) {
                        console.error('Lỗi khi xoá sản phẩm:', error);
                    });
                    
                }
            }
            else{
                if(confirm('Bạn có muốn sửa thông tin đơn hàng không?')){
                    $http({
                        method: 'PUT',
                        data: {
                            MaHoaDon:$scope.mahoadon,
                            TrangThai: $scope.trangthai,
                            NgayTao: ngaytao.value,
                            TongGia: $scope.tonggiachitietsp,
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
                        url: current_url + '/api-admin/HoaDon/update-hoadon',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                            window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                        }
                        if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                            window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                        }
                        if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                            window.location='#!billSell/'+$scope.page
                        }
                    }).catch(function (error) {
                        console.error('Lỗi khi sửa sản phẩm:', error);
                    });
                }
            }
        }
    }


    $scope.deleteDetail=function(){
        if(!$scope.machitiethoadon){
            alert("Chưa chọn mục để xoá")
            return
        }
        else{
            if(confirm('Bạn có muốn xoá chi tiết đơn hàng không?')){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:$scope.mahoadon,
                        TrangThai: $scope.trangthai,
                        NgayTao: ngaytao.value,
                        TongGia: $scope.tonggiachitietsp - Number($scope.giachitietsp),
                        TenKH: $scope.tenkhach,
                        DiaChi: $scope.diachigiao,
                        Email: $scope.email,
                        SDT: $scope.sodienthoai,
                        DiaChiGiaoHang: $scope.diachigiao,
                        list_json_chitiet_hoadon:[{
                            MaChiTietHoaDon: $scope.machitiethoadon,
                            MaSanPham: $scope.masanpham,
                            SoLuongTon: $scope.soluongchitietcu,
                            status:3
                        }]
                    },
                    url: current_url + '/api-admin/HoaDon/update-hoadon',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.key&&$scope.value){
                        window.location='#!billSell/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.key+'/'+$scope.value
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.value){
                        window.location='#!billSell/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi xoá sản phẩm:', error);
                });
            }
        }
    }
})