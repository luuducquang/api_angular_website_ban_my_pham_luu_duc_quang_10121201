app.controller ('product', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.key = $routeParams.key;
    $scope.value = $routeParams.value;
    $scope.pricemin = $routeParams.pricemin;
    $scope.valuepricemin = $routeParams.valuepricemin;
    $scope.pricemax = $routeParams.pricemax;
    $scope.valuepricemax = $routeParams.valuepricemax;
}]);


app.controller("ProductCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[1]).addClass('active_option')

    document.title = 'Thông tin sản phẩm'

    var editorData
    ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .then( editor => {
                editorData = editor
        } )
        .catch( error => {
                console.error( error );
        } );
                
    function getdata() {
        if (editorData) {
            return editorData.getData();
        } else {
            return 'Editor is not initialized yet.';
        }
    }

    $scope.pageSize = 10
    var datas = {
        page:$scope.page,
        pageSize:$scope.pageSize,
        GiaMin: $scope.valuepricemin,
        GiaMax: $scope.valuepricemax
    }
    datas[$scope.key] = $scope.value

	$scope.listItem;	
    $scope.ListDanhMuc;
    $scope.ListDanhMucUuDai;
    $scope.ListNhaSanXuat;
    $scope.ListNhaPhanPhoi;
    $scope.submit = "Thêm mới";
    $scope.AnhProduct
    $scope.AnhProductDetail
    $scope.AnhProductDetailEdit
    $scope.timkiem = $scope.value
    $scope.luachontimkiem = $scope.key

    const giaMinInput = document.getElementById("giaMin");
    const giaMaxInput = document.getElementById("giaMax");
    const giaMinValue = document.getElementById("giaMinValue");
    const giaMaxValue = document.getElementById("giaMaxValue");
    giaMinInput.addEventListener("input", function () {
        giaMinValue.textContent = VND.format(giaMinInput.value);
    });
    giaMinValue.textContent = VND.format(giaMinInput.value);
    
    giaMaxInput.addEventListener("input", function () {
        giaMaxValue.textContent = VND.format(giaMaxInput.value);
    });
    giaMaxValue.textContent = VND.format(giaMaxInput.value);
    
    $scope.pricemin = 'GiaMin'
    $scope.pricemax = 'GiaMax'
    
    if($scope.valuepricemin){
        giaMinInput.value = $scope.valuepricemin
        giaMinValue.textContent = VND.format($scope.valuepricemin)
    }

    if($scope.valuepricemax){
        giaMaxInput.value = $scope.valuepricemax
        giaMaxValue.textContent = VND.format($scope.valuepricemax)
    }

    
    $scope.search = function(){
        
        if(giaMinInput.value>=giaMaxInput.value){
            alert('Giá không hợp lệ')
            return
        }
        else{
            $scope.valuepricemin = giaMinInput.value
            $scope.valuepricemax = giaMaxInput.value
            if((!$scope.timkiem&&!$scope.luachontimkiem)||(!$scope.timkiem&&$scope.luachontimkiem)){
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + _user.token },
                        data: {
                            page: 1,
                            pageSize: $scope.pageSize,
                            GiaMin: $scope.valuepricemin,
                            GiaMax: $scope.valuepricemax
                        },
                        url: current_url + '/api-admin/SanPham/search-sanpham',
                    }).then(function (response) {  
                        if(response.data.totalItems===0){
                            alert("Không có sản phẩm nào")
                            $scope.valuepricemin=''
                            $scope.valuepricemax=''
                            return
                        }
                        else{
                            window.location='#!product/1/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                        }
                    }).catch(function (error) {
                        console.error('Lỗi :', error);
                    });
                }
                else if($scope.timkiem&&!$scope.luachontimkiem){
                    $scope.key = 'TenSanPham'
                    $scope.value = $scope.timkiem
        
                    var data2 = {
                        page: 1,
                        pageSize: $scope.pageSize,
                        GiaMin: $scope.valuepricemin,
                        GiaMax: $scope.valuepricemax
                    };
                    data2[$scope.key] = $scope.value
        
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + _user.token },
                        data: data2,
                        url: current_url + '/api-admin/SanPham/search-sanpham',
                    }).then(function (response) {  
                        if(response.data.totalItems===0){
                            alert("Không có sản phẩm nào")
                            $scope.key =''
                            $scope.value =''
                            $scope.valuepricemin=''
                            $scope.valuepricemax=''
                            return
                        }
                        else{
                            window.location='#!product/1/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                        }
                    }).catch(function (error) {
                        console.error('Lỗi :', error);
                    });
                }
                else{
                    $scope.key = $scope.luachontimkiem
                    $scope.value = $scope.timkiem
        
                    var data2 = {
                        page: 1,
                        pageSize: $scope.pageSize,
                        GiaMin: $scope.valuepricemin,
                        GiaMax: $scope.valuepricemax
                    };
                    data2[$scope.key] = $scope.value
        
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + _user.token },
                        data: data2,
                        url: current_url + '/api-admin/SanPham/search-sanpham',
                    }).then(function (response) {  
                        if(response.data.totalItems===0){
                            alert("Không có sản phẩm nào")
                            $scope.key =''
                            $scope.value =''
                            $scope.valuepricemin=''
                            $scope.valuepricemax=''
                            return
                        }
                        else{
                            window.location='#!product/1/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                        }
                    }).catch(function (error) {
                        console.error('Lỗi :', error);
                    });
                    
                }
        }
    }

    $scope.GetProduct= function () {
        $http({
            method: 'POST',
            data: datas,
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api-admin/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetProduct();

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
                    if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                        window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                    }
                    if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                        window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                    }
                    if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                        window.location='#!product/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                        window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                    }
                    if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                        window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                    }
                    if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                        window.location='#!product/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                    window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                }
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                    window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                    window.location='#!product/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                    window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                }
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                    window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                    window.location='#!product/'+pageNumber
                }
                
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                    window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                }
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                    window.location='#!product/'+pageNumber+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                    window.location='#!product/'+pageNumber
                }
            }
        })
    }

    $scope.GetDanhMuc = function(){
        $http.get(current_url+'/api-admin/DanhMuc/get-all-danhmuc')
        .then(function (response) {  
            $scope.ListDanhMuc = response.data; 
        });
    }
    $scope.GetDanhMuc();

    $scope.GetDanhMucUuDai = function(){
        $http.get(current_url+'/api-admin/DanhMucUuDai/get-all-danhmucuudai')
        .then(function (response) {  
            $scope.ListDanhMucUuDai = response.data; 
        });
    }
    $scope.GetDanhMucUuDai();

    $scope.GetNhaSanXuat = function(){
        $http.get(current_url+'/api-admin/HangSanXuat/get-all-hangsanxuat')
        .then(function (response) {  
            $scope.ListNhaSanXuat = response.data; 
        });
    }
    $scope.GetNhaSanXuat();

    $scope.GetNhaPhanPhoi = function(){
        $http.get(current_url+'/api-admin/NhaPhanPhoi/get-all-nhaphanphoi')
        .then(function (response) {  
            $scope.ListNhaPhanPhoi = response.data; 
        });
    }
    $scope.GetNhaPhanPhoi();

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maSanPham);
        if(idx >-1){
                $scope.selected.splice(idx, 1);
                console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maSanPham);
            console.log($scope.selected);
        }
    }

    yesdel = function(){
        if($scope.selected.length === 0){
            alert("chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'DELETE',
                data: $scope.selected,
                url: current_url + '/api-admin/SanPham/delete-sanpham',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                }
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                    window.location='#!product/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }
    
    $scope.btnAdd=function(){
        $scope.submit="Thêm mới"
        $scope.tensanpham=''
        $scope.gia=0
        $scope.giagiam=0
        $scope.soluong=0
        $scope.trongluong=''
        $scope.trangthai = 'true'
        $scope.mota=''
        editorData.setData('');
        $scope.xuatxu=''
        preview.src=''
        var imgDetail = document.querySelectorAll('.imgdetail img')
        imgDetail.forEach(function(e){
            e.remove()
        })
        $scope.gianhap = 0

    }

    $scope.AddProduct= function () {
        $scope.submit = "Thêm mới";
        $http({
            method: 'POST',
            data: {
                MaDanhMuc: $scope.madanhmuc,
                Madanhmucuudai: $scope.madanhmucuudai,
                TenSanPham: $scope.tensanpham,
                AnhDaiDien: "../img"+$scope.AnhProduct,
                Gia: String($scope.gia).replace(/\./g, ''),
                GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                SoLuong: String($scope.soluong).replace(/\./g, ''),
                TrongLuong:$scope.trongluong,
                TrangThai: $scope.trangthai === "true",
                XuatXu: $scope.xuatxu,
                list_json_chitiet_sanpham:[{
                    MaNhaSanXuat: $scope.manhasanxuat,
                    MoTa: $scope.mota,
                    ChiTiet: getdata(),
                }],
                list_json_sanpham_nhaphanphoi:[{
                    MaNhaPhanPhoi: $scope.manhaphanphoi
                }],
                list_json_anhsanpham:$scope.AnhProductDetail
            },
            url: current_url + '/api-admin/SanPham/create-sanpham',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {  
            alert('Thêm thành công')
            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
            }
            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
            }
            if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                window.location='#!product/'+$scope.page
            }
        }).catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        });
    }; 

    $scope.EditProduct=function(){
        $http({
            method: 'PUT',
            data: {
                MaSanPham: $scope.maSanPham,
                MaDanhMuc: $scope.madanhmuc,
                Madanhmucuudai: $scope.madanhmucuudai,
                TenSanPham: $scope.tensanpham,
                AnhDaiDien: "../img"+$scope.AnhProduct,
                Gia: String($scope.gia).replace(/\./g, ''),
                GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                SoLuong: String($scope.soluong).replace(/\./g, ''),
                TrongLuong:$scope.trongluong,
                TrangThai: $scope.trangthai === "true",
                XuatXu: $scope.xuatxu,
                list_json_chitiet_sanpham:[{
                    MaChiTietSanPham:$scope.machitietsanpham,
                    MaNhaSanXuat: $scope.manhasanxuat,
                    MoTa: $scope.mota,
                    ChiTiet: getdata(),
                    status: 2
                }],
                list_json_sanpham_nhaphanphoi:[{
                    MaSanPham:$scope.maSanPham,
                    MaNhaPhanPhoi: $scope.manhaphanphoi,
                    status: 2
                }],
                list_json_anhsanpham:$scope.AnhProductDetail
            },
            url: current_url + '/api-admin/SanPham/update-sanpham',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {  
            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
            }
            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
            }
            if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                window.location='#!product/'+$scope.page
            }
        }).catch(function (error) {
            console.error('Lỗi khi sửa sản phẩm:', error);
        });
    }

    var preview = document.querySelector('.ImgProduct')
    $scope.save = function(){
        if($scope.tensanpham===''||$scope.gia===''||$scope.giagiam===''||
        $scope.soluong===''||$scope.trongluong===''||
        $scope.mota===''||$scope.madanhmuc===''
        ||$scope.madanhmucuudai===''||$scope.trangthai===''
        ||$scope.manhasanxuat===''||$scope.manhaphanphoi===''){
            alert("Vui lòng nhập đủ thông tin")
            return
        }
        var file = document.getElementById('ImageProduct').files[0];
        var files = document.getElementById('ImageDetail').files;
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
                $scope.AnhProduct = res.data.filePath;
                preview.src = "../img"+ $scope.AnhProduct
                if(files.length>0){
                    var formDatas = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        formDatas.append('files', files[i]);
                    }
                    $http({
                        method: 'POST',
                        headers: {
                            "Authorization": 'Bearer ' + _user.token,
                            'Content-Type': undefined
                        },
                        data: formDatas,
                        url: current_url + '/api-admin/Image/upload-multi',
                    }).then(function (response) {
                        var imgs = response.data.files
                        $scope.AnhProductDetail = imgs.map(function(item){
                            return {LinkAnh:"../img"+ item}
                        })
                        $scope.AnhProductDetailEdit = $scope.AnhProductDetail.map(item => ({ 'Id':$scope.idAnhDetail, ...item, 'status': 1 }));
                        if($scope.submit==="Thêm mới"){
                            $scope.AddProduct()
                        }
                        else{
                            if(confirm("Bạn có muốn sửa thông tin sản phẩm không !")){
                                $http({
                                    method: 'PUT',
                                    data: {
                                        MaSanPham: $scope.maSanPham,
                                        MaDanhMuc: $scope.madanhmuc,
                                        Madanhmucuudai: $scope.madanhmucuudai,
                                        TenSanPham: $scope.tensanpham,
                                        AnhDaiDien: "../img"+$scope.AnhProduct,
                                        Gia: String($scope.gia).replace(/\./g, ''),
                                        GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                                        SoLuong: String($scope.soluong).replace(/\./g, ''),
                                        TrongLuong:$scope.trongluong,
                                        TrangThai: $scope.trangthai === "true",
                                        XuatXu: $scope.xuatxu,
                                        list_json_chitiet_sanpham:[{
                                            MaChiTietSanPham:$scope.machitietsanpham,
                                            MaNhaSanXuat: $scope.manhasanxuat,
                                            MoTa: $scope.mota,
                                            ChiTiet: getdata(),
                                            status: 2
                                        }],
                                        list_json_sanpham_nhaphanphoi:[{
                                            MaSanPham:$scope.maSanPham,
                                            MaNhaPhanPhoi: $scope.manhaphanphoi,
                                            status: 2
                                        }],
                                        list_json_anhsanpham:[{
                                            Id: 0,
                                            LinkAnh:'',
                                            status:0
                                        }]
                                    },
                                    url: current_url + '/api-admin/SanPham/update-sanpham',
                                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                                }).then(function (response) {  
                                    if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                                        window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                                    }
                                    if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                                        window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                                    }
                                    if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                                        window.location='#!product/'+$scope.page
                                    }
                                }).catch(function (error) {
                                    console.error('Lỗi khi sửa sản phẩm:', error);
                                });
                            }
                        }
                    }).catch(function (error) {
                        console.error('Lỗi:', error);
                    });
                }
                else{
                    if($scope.submit==="Thêm mới"){
                        $http({
                            method: 'POST',
                            data: {
                                MaDanhMuc: $scope.madanhmuc,
                                Madanhmucuudai: $scope.madanhmucuudai,
                                TenSanPham: $scope.tensanpham,
                                AnhDaiDien: "../img"+$scope.AnhProduct,
                                Gia: String($scope.gia).replace(/\./g, ''),
                                GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                                SoLuong: String($scope.soluong).replace(/\./g, ''),
                                TrongLuong:$scope.trongluong,
                                TrangThai: $scope.trangthai === "true",
                                XuatXu: $scope.xuatxu,
                                list_json_chitiet_sanpham:[{
                                    MaNhaSanXuat: $scope.manhasanxuat,
                                    MoTa: $scope.mota,
                                    ChiTiet: getdata(),
                                }],
                                list_json_sanpham_nhaphanphoi:[{
                                    MaNhaPhanPhoi: $scope.manhaphanphoi
                                }],
                                list_json_anhsanpham:[{
                                    LinkAnh:''
                                }]
                            },
                            url: current_url + '/api-admin/SanPham/create-sanpham',
                            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                        }).then(function (response) {  
                            alert('Thêm thành công')
                            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                            }
                            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                            }
                            if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                                window.location='#!product/'+$scope.page
                            }
                        }).catch(function (error) {
                            console.error('Lỗi khi thêm sản phẩm:', error);
                        });
                    }
                    else{
                        if(confirm("Bạn có muốn sửa thông tin sản phẩm không !")){
                            $http({
                                method: 'PUT',
                                data: {
                                    MaSanPham: $scope.maSanPham,
                                    MaDanhMuc: $scope.madanhmuc,
                                    Madanhmucuudai: $scope.madanhmucuudai,
                                    TenSanPham: $scope.tensanpham,
                                    AnhDaiDien: "../img"+$scope.AnhProduct,
                                    Gia: String($scope.gia).replace(/\./g, ''),
                                    GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                                    SoLuong: String($scope.soluong).replace(/\./g, ''),
                                    TrongLuong:$scope.trongluong,
                                    TrangThai: $scope.trangthai === "true",
                                    XuatXu: $scope.xuatxu,
                                    list_json_chitiet_sanpham:[{
                                        MaChiTietSanPham:$scope.machitietsanpham,
                                        MaNhaSanXuat: $scope.manhasanxuat,
                                        MoTa: $scope.mota,
                                        ChiTiet: getdata(),
                                        status: 2
                                    }],
                                    list_json_sanpham_nhaphanphoi:[{
                                        MaSanPham:$scope.maSanPham,
                                        MaNhaPhanPhoi: $scope.manhaphanphoi,
                                        status: 2
                                    }],
                                    list_json_anhsanpham:[{
                                        Id:0,
                                        LinkAnh:'',
                                        status:0
                                    }]
                                },
                                url: current_url + '/api-admin/SanPham/update-sanpham',
                                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                            }).then(function (response) {  
                                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                                }
                                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                                }
                                if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                                    window.location='#!product/'+$scope.page
                                }
                            }).catch(function (error) {
                                console.error('Lỗi khi sửa sản phẩm:', error);
                            });
                        }
                    }
                }
            });
        }
        if(!file){
            if(files.length>0){
                var formDatas = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formDatas.append('files', files[i]);
                }
                $http({
                    method: 'POST',
                    headers: {
                        "Authorization": 'Bearer ' + _user.token,
                        'Content-Type': undefined
                    },
                    data: formDatas,
                    url: current_url + '/api-admin/Image/upload-multi',
                }).then(function (response) {
                    var imgs = response.data.files
                    $scope.AnhProductDetail = imgs.map(function(item){
                        return {LinkAnh:"../img"+ item}
                    })
                    // $scope.AnhProductDetailEdit = $scope.AnhProductDetail.map(item => ({ 'Id':$scope.idAnhDetail, ...item, 'status': 0 }));
                    console.log($scope.AnhProductDetailEdit);
                    if($scope.submit==="Thêm mới"){
                        $scope.AddProduct()
                    }
                    else{
                        $http({
                            method: 'PUT',
                            data: {
                                MaSanPham: $scope.maSanPham,
                                MaDanhMuc: $scope.madanhmuc,
                                Madanhmucuudai: $scope.madanhmucuudai,
                                TenSanPham: $scope.tensanpham,
                                AnhDaiDien: $scope.anhsanpham,
                                Gia: String($scope.gia).replace(/\./g, ''),
                                GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                                SoLuong: String($scope.soluong).replace(/\./g, ''),
                                TrongLuong:$scope.trongluong,
                                TrangThai: $scope.trangthai === "true",
                                XuatXu: $scope.xuatxu,
                                list_json_chitiet_sanpham:[{
                                    MaChiTietSanPham:$scope.machitietsanpham,
                                    MaNhaSanXuat: $scope.manhasanxuat,
                                    MoTa: $scope.mota,
                                    ChiTiet: getdata(),
                                    status: 2
                                }],
                                list_json_sanpham_nhaphanphoi:[{
                                    MaSanPham:$scope.maSanPham,
                                    MaNhaPhanPhoi: $scope.manhaphanphoi,
                                    status: 2
                                }],
                                list_json_anhsanpham:[{
                                    Id: 0,
                                    LinkAnh:'',
                                    status:0
                                }]
                            },
                            url: current_url + '/api-admin/SanPham/update-sanpham',
                            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                        }).then(function (response) {  
                            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                            }
                            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                            }
                            if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                                window.location='#!product/'+$scope.page
                            }
                        }).catch(function (error) {
                            console.error('Lỗi khi sửa sản phẩm:', error);
                        });
                    }
                }).catch(function (error) {
                    console.error('Lỗi:', error);
                });
            }
        }
        if(!file || !files){
            if($scope.submit==="Thêm mới"){ 
                $http({
                    method: 'POST',
                    data: {
                        MaDanhMuc: $scope.madanhmuc,
                        Madanhmucuudai: $scope.madanhmucuudai,
                        TenSanPham: $scope.tensanpham,
                        AnhDaiDien: '',
                        Gia: String($scope.gia).replace(/\./g, ''),
                        GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                        SoLuong: String($scope.soluong).replace(/\./g, ''),
                        TrongLuong:$scope.trongluong,
                        TrangThai: $scope.trangthai === "true",
                        XuatXu: $scope.xuatxu,
                        list_json_chitiet_sanpham:[{
                            MaNhaSanXuat: $scope.manhasanxuat,
                            MoTa: $scope.mota,
                            ChiTiet: getdata(),
                        }],
                        list_json_sanpham_nhaphanphoi:[{
                            MaNhaPhanPhoi: $scope.manhaphanphoi
                        }],
                        list_json_anhsanpham:[{
                            LinkAnh:''
                        }]
                    },
                    url: current_url + '/api-admin/SanPham/create-sanpham',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    alert('Thêm thành công')
                    if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                        window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                    }
                    if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                        window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                    }
                    if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                        window.location='#!product/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
            }
            else{
                if(confirm("Bạn có muốn sửa thông tin sản phẩm không !")){
                    $http({
                        method: 'PUT',
                        data: {
                            MaSanPham: $scope.maSanPham,
                            MaDanhMuc: $scope.madanhmuc,
                            Madanhmucuudai: $scope.madanhmucuudai,
                            TenSanPham: $scope.tensanpham,
                            AnhDaiDien: $scope.anhsanpham,
                            Gia: String($scope.gia).replace(/\./g, ''),
                            GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                            SoLuong: String($scope.soluong).replace(/\./g, ''),
                            TrongLuong:$scope.trongluong,
                            TrangThai: $scope.trangthai === "true",
                            XuatXu: $scope.xuatxu,
                            list_json_chitiet_sanpham:[{
                                MaChiTietSanPham:$scope.machitietsanpham,
                                MaNhaSanXuat: $scope.manhasanxuat,
                                MoTa: $scope.mota,
                                ChiTiet: getdata(),
                                status: 2
                            }],
                            list_json_sanpham_nhaphanphoi:[{
                                MaSanPham:$scope.maSanPham,
                                MaNhaPhanPhoi: $scope.manhaphanphoi,
                                status: 2
                            }],
                            list_json_anhsanpham:[{
                                Id: 0,
                                LinkAnh:'',
                                status:0
                            }]
                        },
                        url: current_url + '/api-admin/SanPham/update-sanpham',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                            window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                        }
                        if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                            window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                        }
                        if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                            window.location='#!product/'+$scope.page
                        }
                    }).catch(function (error) {
                        console.error('Lỗi khi sửa sản phẩm:', error);
                    });
                }
            }
        }
    }

    $scope.addDetail=function(){
        var files = document.getElementById('ImageDetail').files;
        if(files.length>0){
            var formDatas = new FormData();
            for (let i = 0; i < files.length; i++) {
                formDatas.append('files', files[i]);
            }
            $http({
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + _user.token,
                    'Content-Type': undefined
                },
                data: formDatas,
                url: current_url + '/api-admin/Image/upload-multi',
            }).then(function (response) {
                var imgs = response.data.files
                $scope.AnhProductDetail = imgs.map(function(item){
                    return {LinkAnh:"../img"+ item}
                })
                $scope.AnhProductDetailEdit = $scope.AnhProductDetail.map(item => ({ ...item, 'status': 1 }));
                console.log($scope.AnhProductDetailEdit);
                if($scope.submit==="Thêm mới"){
                    $scope.AddProduct()
                }
                else{
                    $http({
                        method: 'PUT',
                        data: {
                            MaSanPham: $scope.maSanPham,
                            MaDanhMuc: $scope.madanhmuc,
                            Madanhmucuudai: $scope.madanhmucuudai,
                            TenSanPham: $scope.tensanpham,
                            AnhDaiDien: $scope.anhsanpham,
                            Gia: String($scope.gia).replace(/\./g, ''),
                            GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                            SoLuong: String($scope.soluong).replace(/\./g, ''),
                            TrongLuong:$scope.trongluong,
                            TrangThai: $scope.trangthai === "true",
                            XuatXu: $scope.xuatxu,
                            list_json_chitiet_sanpham:[{
                                MaChiTietSanPham:$scope.machitietsanpham,
                                MaNhaSanXuat: $scope.manhasanxuat,
                                MoTa: $scope.mota,
                                ChiTiet: getdata(),
                                status: 2
                            }],
                            list_json_sanpham_nhaphanphoi:[{
                                MaSanPham:$scope.maSanPham,
                                MaNhaPhanPhoi: $scope.manhaphanphoi,
                                status: 2
                            }],
                            list_json_anhsanpham:$scope.AnhProductDetailEdit
                        },
                        url: current_url + '/api-admin/SanPham/update-sanpham',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        alert('Thêm thành công')
                        if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                            window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                        }
                        if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                            window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                        }
                        if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                            window.location='#!product/'+$scope.page
                        }
                    }).catch(function (error) {
                        console.error('Lỗi khi thêm sản phẩm:', error);
                    });
                }
            }).catch(function (error) {
                console.error('Lỗi:', error);
            });
        }
        else{
            alert('chưa chọn ảnh để thêm')
        }
    }

    function loadImgDetail(){
        var imgContainer = document.querySelector('.imgdetail');
            var images = imgContainer.querySelectorAll('img');

            images.forEach(function(img) {
                img.remove();
            });
    }
    
    $scope.machitietsanpham
    $scope.listImgDetailShow =[]
    $scope.maSanPham
    $scope.edit=function(x){
        $scope.submit = "Chỉnh sửa";
        $(".product-container").toggleClass("hide")
        $scope.maSanPham = x
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api-admin/SanPham/getbyid-sanpham/' + x,
        }).then(function (response) {
            let sanpham = response.data;
            $scope.madanhmuc = String(sanpham.maDanhMuc)
            $scope.madanhmucuudai = String(sanpham.madanhmucuudai)
            $scope.tensanpham = sanpham.tenSanPham
            $scope.anhsanpham = sanpham.anhDaiDien
            $scope.gia = sanpham.gia.toLocaleString('de-DE')
            $scope.giagiam = sanpham.giaGiam.toLocaleString('de-DE')
            $scope.soluong = sanpham.soLuong.toLocaleString('de-DE')
            $scope.trongluong = sanpham.trongLuong
            $scope.trangthai = String(sanpham.trangThai)
            $scope.manhasanxuat = String(sanpham.maNhaSanXuat)
            $scope.mota = sanpham.moTa
            // $scope.chitiet = sanpham.chiTiet
            editorData.setData(sanpham.chiTiet);
            $scope.manhaphanphoi = String(sanpham.maNhaPhanPhoi)
            preview.src = sanpham.anhDaiDien
            $scope.machitietsanpham = sanpham.maChiTietSanPham
            $scope.xuatxu = sanpham.xuatXu
            $scope.gianhap = sanpham.gia / (1 +  0.5 )
            $(document).ready(function() {
                $('#mySelect-danhmuc').trigger('change');
                $('#mySelect-danhmucuudai').trigger('change');
                $('#mySelect-producer').trigger('change');
                $('#mySelect-distributor').trigger('change');
            });
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });

        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api-admin/SanPham/getbyid-anhsanphamdetail/' + x,
        }).then(function(response){
            var listdetail = (response.data).map(function(item){
                return {
                    id:item.id,
                    linkAnh:item.linkAnh
                }
            })
            loadImgDetail()
            var imgContainer = document.querySelector('.imgdetail');

            for (let i = 0; i < listdetail.length; i++) {
                var fileToLoad = listdetail[i].linkAnh;
                var newImg = document.createElement('img');
                newImg.src = fileToLoad;
                newImg.dataset.id = listdetail[i].id;

                newImg.onclick = createClickHandler(newImg, listdetail[i].id);

                imgContainer.appendChild(newImg);
            }
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });

    }
    
    function createClickHandler(img, id) {
        return function() {
            var selectedImages = document.querySelectorAll('.imgdetail img');
            selectedImages.forEach(img => img.classList.remove('choseImg'));
            img.classList.add('choseImg');
            clickImgDetail(id);
        };
    }

    $scope.idAnhDetail
    clickImgDetail=function(a){
        $scope.idAnhDetail=a
    }

    $scope.editDetail=function(){
        if($scope.idAnhDetail){
            var files = document.getElementById('ImageDetail').files;
            if(files.length>0){
                var formDatas = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formDatas.append('files', files[i]);
                }
                $http({
                    method: 'POST',
                    headers: {
                        "Authorization": 'Bearer ' + _user.token,
                        'Content-Type': undefined
                    },
                    data: formDatas,
                    url: current_url + '/api-admin/Image/upload-multi',
                }).then(function (response) {
                    var imgs = response.data.files
                    $scope.AnhProductDetail = imgs.map(function(item){
                        return {LinkAnh:"../img"+ item}
                    })
                    $scope.AnhProductDetailEdit = $scope.AnhProductDetail.map(item => ({"Id":$scope.idAnhDetail, ...item, 'status': 2 }));
                    console.log($scope.AnhProductDetailEdit);
                    if($scope.submit==="Thêm mới"){
                        $scope.AddProduct()
                    }
                    else{
                        $http({
                            method: 'PUT',
                            data: {
                                MaSanPham: $scope.maSanPham,
                                MaDanhMuc: $scope.madanhmuc,
                                Madanhmucuudai: $scope.madanhmucuudai,
                                TenSanPham: $scope.tensanpham,
                                AnhDaiDien: $scope.anhsanpham,
                                Gia: String($scope.gia).replace(/\./g, ''),
                                GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                                SoLuong: String($scope.soluong).replace(/\./g, ''),
                                TrongLuong:$scope.trongluong,
                                TrangThai: $scope.trangthai === "true",
                                XuatXu: $scope.xuatxu,
                                list_json_chitiet_sanpham:[{
                                    MaChiTietSanPham:$scope.machitietsanpham,
                                    MaNhaSanXuat: $scope.manhasanxuat,
                                    MoTa: $scope.mota,
                                    ChiTiet: getdata(),
                                    status: 2
                                }],
                                list_json_sanpham_nhaphanphoi:[{
                                    MaSanPham:$scope.maSanPham,
                                    MaNhaPhanPhoi: $scope.manhaphanphoi,
                                    status: 2
                                }],
                                list_json_anhsanpham:$scope.AnhProductDetailEdit
                            },
                            url: current_url + '/api-admin/SanPham/update-sanpham',
                            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                        }).then(function (response) {  
                            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                            }
                            if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                                window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                            }
                            if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                                window.location='#!product/'+$scope.page
                            }
                        }).catch(function (error) {
                            console.error('Lỗi khi sửa sản phẩm:', error);
                        });
                    }
                }).catch(function (error) {
                    console.error('Lỗi:', error);
                });
            }
            else{
                alert('Chưa chọn ảnh để sửa')
            }
        }
        else{
            alert('Chưa chọn ảnh để sửa')
        }
    }

    $scope.deleteDetail=function(){
        if($scope.idAnhDetail){
            $http({
                method: 'PUT',
                data: {
                    MaSanPham: $scope.maSanPham,
                    MaDanhMuc: $scope.madanhmuc,
                    Madanhmucuudai: $scope.madanhmucuudai,
                    TenSanPham: $scope.tensanpham,
                    AnhDaiDien: $scope.anhsanpham,
                    Gia: String($scope.gia).replace(/\./g, ''),
                    GiaGiam: String($scope.giagiam).replace(/\./g, ''),
                    SoLuong: String($scope.soluong).replace(/\./g, ''),
                    TrongLuong:$scope.trongluong,
                    TrangThai: $scope.trangthai === "true",
                    XuatXu: $scope.xuatxu,
                    list_json_chitiet_sanpham:[{
                        MaChiTietSanPham:$scope.machitietsanpham,
                        MaNhaSanXuat: $scope.manhasanxuat,
                        MoTa: $scope.mota,
                        ChiTiet: getdata(),
                        status: 2
                    }],
                    list_json_sanpham_nhaphanphoi:[{
                        MaSanPham:$scope.maSanPham,
                        MaNhaPhanPhoi: $scope.manhaphanphoi,
                        status: 2
                    }],
                    list_json_anhsanpham:[{
                        Id:$scope.idAnhDetail,
                        status:3
                    }]
                },
                url: current_url + '/api-admin/SanPham/update-sanpham',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                }
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                    window.location='#!product/'+$scope.page
                }
            }).catch(function (error) {
                console.error('Lỗi khi sửa sản phẩm:', error);
            });
        }
        else{
            alert('Chưa chọn ảnh để xoá')
        }
    }

    $scope.getFilePathProduct=function(){
        $('#ImageProduct').change(function () {
            var file = this.files[0]
            var preview = document.querySelector('.ImgProduct')
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


    var ListImg = []
    function getFilesDetail(){
        $('#ImageDetail').change(function () {
            var file = this.files
            if(!file){
                return
            }
            if(file.size / (1024*1024)>5){
                alert("File không được quá 5MB")
            }
            if(file.length>0){
                loadImgDetail()
                for (let i = 0; i < file.length; i++) {
                    var fileToLoad = file[i]
                    var reader = new FileReader()
                    reader.onload = function(e){
                        var srcImg = e.target.result
                        var newImg = document.createElement('img')
                        newImg.src = srcImg
                        document.querySelector('.imgdetail').appendChild(newImg)
                        ListImg.push(fileToLoad);
                    }
                    reader.readAsDataURL(fileToLoad)
                }
            }
        });
    }
    getFilesDetail()

    $scope.up5persen = function(){
        if(confirm('Bạn có muốn tăng giá tất cả sản phẩm lên 5% không ?')){
            $http({
                method: 'GET',
                headers: { "Authorization": 'Bearer ' + _user.token },
                url: current_url + '/api-admin/SanPham/tang-5-persen',
            }).then(function (response) {  
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                }
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                    window.location='#!product/'+$scope.page
                }
            }).catch(function (error) {
                console.error('Lỗi khi sửa sản phẩm:', error);
            });
        }
    }

    $scope.down5persen = function(){
        if(confirm('Bạn có muốn giảm giá tất cả sản phẩm xuống 5% không ?')){
            $http({
                method: 'GET',
                headers: { "Authorization": 'Bearer ' + _user.token },
                url: current_url + '/api-admin/SanPham/giam-5-persen',
            }).then(function (response) {  
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax){
                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax
                }
                if($scope.pricemin&&$scope.pricemax&&$scope.valuepricemin&&$scope.valuepricemax&&$scope.key&&$scope.value){
                    window.location='#!product/'+$scope.page+'/'+$scope.pricemin+'/'+$scope.valuepricemin+'/'+$scope.pricemax+'/'+$scope.valuepricemax+'/'+$scope.key+'/'+$scope.value
                }
                if(!$scope.valuepricemin&&!$scope.valuepricemax&&!$scope.value){
                    window.location='#!product/'+$scope.page
                }
            }).catch(function (error) {
                console.error('Lỗi khi sửa sản phẩm:', error);
            });
        }
    }
});