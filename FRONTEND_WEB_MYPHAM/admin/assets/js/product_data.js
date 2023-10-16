app.controller ('product', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);


app.controller("ProductCtrl", function ($scope, $http) {
    var datas = {
        page:$scope.page,
        pageSize:10
    }
	$scope.listItem;	
    $scope.ListDanhMuc;
    $scope.ListDanhMucUuDai;
    $scope.ListNhaSanXuat;
    $scope.ListNhaPhanPhoi;
    $scope.submit = "Thêm mới";
    $scope.AnhProduct
    $scope.AnhProductDetail
    $scope.AnhProductDetailEdit

    $scope.GetProduct= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
            console.log(_user.token);
        });
    };   
	$scope.GetProduct();

    $scope.pageIndex = function(total){
        $('.page-count li').remove()
            var count = Math.ceil((total) / datas.pageSize)
            var currentPage = $scope.page;
            var aItem = [];
            for (var i = 1; i < count + 1; i++) {
                let li = document.createElement('li')
                li.className = 'page-item'
                let a = document.createElement('a')
                a.className = 'page-link'
                li.appendChild(a)
                a.innerText = i
                aItem.push(a);
                $('.page-count').append(li)
                a.onclick = function () {
                    $scope.changePage(a.innerHTML)
                    a.href='#!product/'+a.innerHTML
                }
            }    

            aItem[currentPage - 1].classList.add('activePage');
            
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    window.location='#!product/'+$scope.page
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    window.location='#!product/'+$scope.page
                }
            }
    }
    

    $scope.changePage=function(i) {
        datas.page = i
    }

    $scope.GetDanhMuc = function(){
        $http.get(current_url+'/api/DanhMuc/get-all-danhmuc')
        .then(function (response) {  
            $scope.ListDanhMuc = response.data; 
        });
    }
    $scope.GetDanhMuc();

    $scope.GetDanhMucUuDai = function(){
        $http.get(current_url+'/api/DanhMucUuDai/get-all-danhmucuudai')
        .then(function (response) {  
            $scope.ListDanhMucUuDai = response.data; 
        });
    }
    $scope.GetDanhMucUuDai();

    $scope.GetNhaSanXuat = function(){
        $http.get(current_url+'/api/HangSanXuat/get-all-hangsanxuat')
        .then(function (response) {  
            $scope.ListNhaSanXuat = response.data; 
        });
    }
    $scope.GetNhaSanXuat();

    $scope.GetNhaPhanPhoi = function(){
        $http.get(current_url+'/api/NhaPhanPhoi/get-all-nhaphanphoi')
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
                url: current_url + '/api/SanPham/delete-sanpham',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Xoá thành công')
                window.location='#!product/'+$scope.page
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }
    
    $scope.btnAdd=function(){
        $scope.submit="Thêm mới"
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
                Gia: $scope.gia,
                GiaGiam: $scope.giagiam,
                SoLuong: $scope.soluong,
                TrongLuong:$scope.trongluong,
                TrangThai: $scope.trangthai === "true",
                LuotXem: $scope.luotxem,
                list_json_chitiet_sanpham:[{
                    MaNhaSanXuat: $scope.manhasanxuat,
                    MoTa: $scope.mota,
                    ChiTiet: $scope.chitiet,
                }],
                list_json_sanpham_nhaphanphoi:[{
                    MaNhaPhanPhoi: $scope.manhaphanphoi
                }],
                list_json_anhsanpham:$scope.AnhProductDetail
            },
            url: current_url + '/api/SanPham/create-sanpham',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {  
            alert('Thêm thành công')
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
                Gia: $scope.gia,
                GiaGiam: $scope.giagiam,
                SoLuong: $scope.soluong,
                TrongLuong:$scope.trongluong,
                TrangThai: $scope.trangthai === "true",
                LuotXem: $scope.luotxem,
                list_json_chitiet_sanpham:[{
                    MaChiTietSanPham:$scope.machitietsanpham,
                    MaNhaSanXuat: $scope.manhasanxuat,
                    MoTa: $scope.mota,
                    ChiTiet: $scope.chitiet,
                    status: 2
                }],
                list_json_sanpham_nhaphanphoi:[{
                    MaSanPham:$scope.maSanPham,
                    MaNhaPhanPhoi: $scope.manhaphanphoi,
                    status: 2
                }],
                list_json_anhsanpham:$scope.AnhProductDetail
            },
            url: current_url + '/api/SanPham/update-sanpham',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {  
            alert('Sửa thành công')
            window.location='#!product/'+$scope.page
        }).catch(function (error) {
            console.error('Lỗi khi sửa sản phẩm:', error);
        });
    }

    var preview = document.querySelector('.ImgProduct')
    $scope.save = function(){
        if($scope.tensanpham===''||$scope.gia===''||$scope.giagiam===''||
        $scope.soluong===''||$scope.trongluong===''||
        $scope.luotxem===''|| $scope.mota===''||$scope.chitiet===''){
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
                url: current_url + '/api/Image/upload',
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
                        url: current_url + '/api/Image/upload-multi',
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
                            $http({
                                method: 'PUT',
                                data: {
                                    MaSanPham: $scope.maSanPham,
                                    MaDanhMuc: $scope.madanhmuc,
                                    Madanhmucuudai: $scope.madanhmucuudai,
                                    TenSanPham: $scope.tensanpham,
                                    AnhDaiDien: "../img"+$scope.AnhProduct,
                                    Gia: $scope.gia,
                                    GiaGiam: $scope.giagiam,
                                    SoLuong: $scope.soluong,
                                    TrongLuong:$scope.trongluong,
                                    TrangThai: $scope.trangthai === "true",
                                    LuotXem: $scope.luotxem,
                                    list_json_chitiet_sanpham:[{
                                        MaChiTietSanPham:$scope.machitietsanpham,
                                        MaNhaSanXuat: $scope.manhasanxuat,
                                        MoTa: $scope.mota,
                                        ChiTiet: $scope.chitiet,
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
                                url: current_url + '/api/SanPham/update-sanpham',
                                headers: {'Content-Type': 'application/json'}
                            }).then(function (response) {  
                                alert('Sửa thành công')
                                window.location='#!product/'+$scope.page
                            }).catch(function (error) {
                                console.error('Lỗi khi sửa sản phẩm:', error);
                            });
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
                                Gia: $scope.gia,
                                GiaGiam: $scope.giagiam,
                                SoLuong: $scope.soluong,
                                TrongLuong:$scope.trongluong,
                                TrangThai: $scope.trangthai === "true",
                                LuotXem: $scope.luotxem,
                                list_json_chitiet_sanpham:[{
                                    MaNhaSanXuat: $scope.manhasanxuat,
                                    MoTa: $scope.mota,
                                    ChiTiet: $scope.chitiet,
                                }],
                                list_json_sanpham_nhaphanphoi:[{
                                    MaNhaPhanPhoi: $scope.manhaphanphoi
                                }],
                                list_json_anhsanpham:[{
                                    LinkAnh:''
                                }]
                            },
                            url: current_url + '/api/SanPham/create-sanpham',
                            headers: {'Content-Type': 'application/json'}
                        }).then(function (response) {  
                            alert('Thêm thành công')
                        }).catch(function (error) {
                            console.error('Lỗi khi thêm sản phẩm:', error);
                        });
                    }
                    else{
                        $http({
                            method: 'PUT',
                            data: {
                                MaSanPham: $scope.maSanPham,
                                MaDanhMuc: $scope.madanhmuc,
                                Madanhmucuudai: $scope.madanhmucuudai,
                                TenSanPham: $scope.tensanpham,
                                AnhDaiDien: "../img"+$scope.AnhProduct,
                                Gia: $scope.gia,
                                GiaGiam: $scope.giagiam,
                                SoLuong: $scope.soluong,
                                TrongLuong:$scope.trongluong,
                                TrangThai: $scope.trangthai === "true",
                                LuotXem: $scope.luotxem,
                                list_json_chitiet_sanpham:[{
                                    MaChiTietSanPham:$scope.machitietsanpham,
                                    MaNhaSanXuat: $scope.manhasanxuat,
                                    MoTa: $scope.mota,
                                    ChiTiet: $scope.chitiet,
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
                            url: current_url + '/api/SanPham/update-sanpham',
                            headers: {'Content-Type': 'application/json'}
                        }).then(function (response) {  
                            alert('Sửa thành công')
                            window.location='#!product/'+$scope.page
                        }).catch(function (error) {
                            console.error('Lỗi khi sửa sản phẩm:', error);
                        });
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
                    url: current_url + '/api/Image/upload-multi',
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
                                Gia: $scope.gia,
                                GiaGiam: $scope.giagiam,
                                SoLuong: $scope.soluong,
                                TrongLuong:$scope.trongluong,
                                TrangThai: $scope.trangthai === "true",
                                LuotXem: $scope.luotxem,
                                list_json_chitiet_sanpham:[{
                                    MaChiTietSanPham:$scope.machitietsanpham,
                                    MaNhaSanXuat: $scope.manhasanxuat,
                                    MoTa: $scope.mota,
                                    ChiTiet: $scope.chitiet,
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
                            url: current_url + '/api/SanPham/update-sanpham',
                            headers: {'Content-Type': 'application/json'}
                        }).then(function (response) {  
                            alert('Sửa thành công')
                            window.location='#!product/'+$scope.page
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
                        Gia: $scope.gia,
                        GiaGiam: $scope.giagiam,
                        SoLuong: $scope.soluong,
                        TrongLuong:$scope.trongluong,
                        TrangThai: $scope.trangthai === "true",
                        LuotXem: $scope.luotxem,
                        list_json_chitiet_sanpham:[{
                            MaNhaSanXuat: $scope.manhasanxuat,
                            MoTa: $scope.mota,
                            ChiTiet: $scope.chitiet,
                        }],
                        list_json_sanpham_nhaphanphoi:[{
                            MaNhaPhanPhoi: $scope.manhaphanphoi
                        }],
                        list_json_anhsanpham:[{
                            LinkAnh:''
                        }]
                    },
                    url: current_url + '/api/SanPham/create-sanpham',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Thêm thành công')
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
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
                        Gia: $scope.gia,
                        GiaGiam: $scope.giagiam,
                        SoLuong: $scope.soluong,
                        TrongLuong:$scope.trongluong,
                        TrangThai: $scope.trangthai === "true",
                        LuotXem: $scope.luotxem,
                        list_json_chitiet_sanpham:[{
                            MaChiTietSanPham:$scope.machitietsanpham,
                            MaNhaSanXuat: $scope.manhasanxuat,
                            MoTa: $scope.mota,
                            ChiTiet: $scope.chitiet,
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
                    url: current_url + '/api/SanPham/update-sanpham',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Sửa thành công')
                    window.location='#!product/'+$scope.page
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
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
                url: current_url + '/api/Image/upload-multi',
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
                            Gia: $scope.gia,
                            GiaGiam: $scope.giagiam,
                            SoLuong: $scope.soluong,
                            TrongLuong:$scope.trongluong,
                            TrangThai: $scope.trangthai === "true",
                            LuotXem: $scope.luotxem,
                            list_json_chitiet_sanpham:[{
                                MaChiTietSanPham:$scope.machitietsanpham,
                                MaNhaSanXuat: $scope.manhasanxuat,
                                MoTa: $scope.mota,
                                ChiTiet: $scope.chitiet,
                                status: 2
                            }],
                            list_json_sanpham_nhaphanphoi:[{
                                MaSanPham:$scope.maSanPham,
                                MaNhaPhanPhoi: $scope.manhaphanphoi,
                                status: 2
                            }],
                            list_json_anhsanpham:$scope.AnhProductDetailEdit
                        },
                        url: current_url + '/api/SanPham/update-sanpham',
                        headers: {'Content-Type': 'application/json'}
                    }).then(function (response) {  
                        alert('Thêm thành công')
                        window.location='#!product/'+$scope.page
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
            url: current_url + '/api/SanPham/getbyid-sanpham/' + x,
        }).then(function (response) {
            let sanpham = response.data;
            $scope.madanhmuc = String(sanpham.maDanhMuc)
            $scope.madanhmucuudai = String(sanpham.madanhmucuudai)
            $scope.tensanpham = sanpham.tenSanPham
            $scope.anhsanpham = sanpham.anhDaiDien
            $scope.gia = sanpham.gia
            $scope.giagiam = sanpham.giaGiam
            $scope.soluong = sanpham.soLuong
            $scope.trongluong = sanpham.trongLuong
            $scope.trangthai = String(sanpham.trangThai)
            $scope.luotxem = sanpham.luotXem
            $scope.manhasanxuat = String(sanpham.maNhaSanXuat)
            $scope.mota = sanpham.moTa
            $scope.chitiet = sanpham.chiTiet
            $scope.manhaphanphoi = String(sanpham.maNhaPhanPhoi)
            preview.src = sanpham.anhDaiDien
            $scope.machitietsanpham = sanpham.maChiTietSanPham
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });

        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api/SanPham/getbyid-anhsanphamdetail/' + x,
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
                    url: current_url + '/api/Image/upload-multi',
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
                                Gia: $scope.gia,
                                GiaGiam: $scope.giagiam,
                                SoLuong: $scope.soluong,
                                TrongLuong:$scope.trongluong,
                                TrangThai: $scope.trangthai === "true",
                                LuotXem: $scope.luotxem,
                                list_json_chitiet_sanpham:[{
                                    MaChiTietSanPham:$scope.machitietsanpham,
                                    MaNhaSanXuat: $scope.manhasanxuat,
                                    MoTa: $scope.mota,
                                    ChiTiet: $scope.chitiet,
                                    status: 2
                                }],
                                list_json_sanpham_nhaphanphoi:[{
                                    MaSanPham:$scope.maSanPham,
                                    MaNhaPhanPhoi: $scope.manhaphanphoi,
                                    status: 2
                                }],
                                list_json_anhsanpham:$scope.AnhProductDetailEdit
                            },
                            url: current_url + '/api/SanPham/update-sanpham',
                            headers: {'Content-Type': 'application/json'}
                        }).then(function (response) {  
                            alert('Sửa thành công')
                            window.location='#!product/'+$scope.page
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
                    Gia: $scope.gia,
                    GiaGiam: $scope.giagiam,
                    SoLuong: $scope.soluong,
                    TrongLuong:$scope.trongluong,
                    TrangThai: $scope.trangthai === "true",
                    LuotXem: $scope.luotxem,
                    list_json_chitiet_sanpham:[{
                        MaChiTietSanPham:$scope.machitietsanpham,
                        MaNhaSanXuat: $scope.manhasanxuat,
                        MoTa: $scope.mota,
                        ChiTiet: $scope.chitiet,
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
                url: current_url + '/api/SanPham/update-sanpham',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {  
                alert('Xoá thành công')
                window.location='#!product/'+$scope.page
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
});