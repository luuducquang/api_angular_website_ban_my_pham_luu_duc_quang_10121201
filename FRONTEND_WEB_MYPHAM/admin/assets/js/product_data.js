app.controller("ProductCtrl", function ($scope, $http) {
    var data = {
        page:1,
        pageSize:10
    }
	$scope.listItem;	
    $scope.ListDanhMuc;
    $scope.ListDanhMucUuDai;
    $scope.ListNhaSanXuat;
    $scope.ListNhaPhanPhoi;
    $scope.GetBanChay= function () {
        $http({
            method: 'POST',
            data: data,
            url: current_url + '/api/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            console.log($scope.listItem);
        });
    };   
	$scope.GetBanChay();

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
        var idx = $scope.selected.indexOf(item);
        if(idx >-1){
                $scope.selected.splice(idx, 1);
        }
        else{
            $scope.selected.push(item);
        }
        console.log($scope.selected);
        console.log(idx);
    }
    
    $scope.AddProduct= function () {
        var linkAnh = ListImg
        $http({
            method: 'POST',
            data: {
                MaDanhMuc: $scope.danhmuc,
                Madanhmucuudai: $scope.danhmucuudai,
                TenSanPham: $scope.nameProduct,
                Gia: $scope.price,
                GiaGiam: $scope.priceold,
                SoLuong: $scope.quantity,
                TrangThai: Boolean($scope.status),
                LuotXem: $scope.view,
                DacBiet: Boolean($scope.special),
                list_json_chitiet_sanpham:[{
                    MaNhaSanXuat: $scope.producer,
                    MoTa: $scope.describe,
                    ChiTiet: $scope.detail,
                }],
                list_json_sanpham_nhaphanphoi:[{
                    MaNhaPhanPhoi: $scope.distributor
                }]
            },
            url: current_url + '/api/SanPham/create-sanpham',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {  
            alert('them thanh cong')
        }).catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        });
    }; 
    $scope.addProduct = function(){
        $scope.AddProduct()
    }
    
    function getFilePathProduct(){
        $('#ImageProduct').change(function () {
            var file = this.files[0]
            var preview = document.querySelector('.ImgProduct')
            if(!file){
                return
            }
            if(file.size / (1024*1024)>5){
                alert("File không được quá 5MB")
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function(e){
                preview.src = e.target.result
            }
        });
    }
    getFilePathProduct()

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
                for (let i = 0; i < file.length; i++) {
                    var fileToLoad = file[i]
                    var reader = new FileReader()
                    reader.onload = function(e){
                        var srcImg = e.target.result
                        var newImg = document.createElement('img')
                        newImg.src = srcImg
                        document.querySelector('.imgdetail').innerHTML += newImg.outerHTML
                        ListImg.push(srcImg)
                    }
                    reader.readAsDataURL(fileToLoad)
                    console.log(ListImg);
                }
            }
        });
    }
    getFilesDetail()


});