app.controller ('bannerslide', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("BannerSlideCtrl", function ($scope, $http) {
    $scope.submit = "Thêm mới";
	$scope.listSlide;	
    $scope.pageSize=10
    $scope.Image
    $scope.MaSlide

    $scope.GetSlide= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: {
                page: $scope.page,
                pageSize: $scope.pageSize
            },
            url: current_url + '/api/SlideDetail/search-slide',
        }).then(function (response) {  
            $scope.listSlide = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetSlide();

    $scope.pageIndex = function(total){
        $('.page-count li').remove()
            var count = Math.ceil((total) / $scope.pageSize)
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
                    a.href='#!bannerslide/'+a.innerHTML
                }
            }    

            aItem[currentPage - 1].classList.add('activePage');    
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    window.location='#!bannerslide/'+$scope.page
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    window.location='#!bannerslide/'+$scope.page
                }
            }
    }
    
    $scope.changePage=function(i) {
        $scope.page = i
    }

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maAnh);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maAnh);
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
                url: current_url + '/api/SlideDetail/delete-slide_detail',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Xoá thành công')
                window.location='#!bannerslide/'+$scope.page
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

    $scope.btnAdd=function(){
        $scope.submit="Thêm mới"
        $scope.tieude=''
        $scope.mota=''
        preview.src=''
    }

    $scope.edit = function(x){
        $scope.submit = "Chỉnh sửa";
        $(".product-container").toggleClass("hide")
        $scope.MaSlide = x.maAnh
        $scope.tieude = x.tieuDe
        $scope.mota = x.moTa
        $scope.hinhanh = x.linkAnh
        preview.src = x.linkAnh
    }

    $scope.save = function(){
        if($scope.tieude===''||$scope.mota===''){
            alert("Vui lòng nhập đủ thông tin")
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
                preview.src = "../img"+ $scope.Image

                if($scope.submit==="Thêm mới"){
                    $http({
                        method: 'POST',
                        data: {
                            LinkAnh: "../img"+$scope.Image,
                            TieuDe: $scope.tieude,
                            MoTa: $scope.mota
                        },
                        url: current_url + '/api/SlideDetail/create-slide_detail',
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
                            MaAnh: $scope.MaSlide,
                            LinkAnh: "../img"+$scope.Image,
                            TieuDe: $scope.tieude,
                            MoTa: $scope.mota
                        },
                        url: current_url + '/api/SlideDetail/update-slide_detail',
                        headers: {'Content-Type': 'application/json'}
                    }).then(function (response) {  
                        alert('Sửa thành công')
                    }).catch(function (error) {
                        console.error('Lỗi khi sửa sản phẩm:', error);
                    });
                }
            });
        }
        else{
            if($scope.submit==="Thêm mới"){
                $http({
                    method: 'POST',
                    data: {
                        LinkAnh: "../img"+$scope.Image,
                        TieuDe: $scope.tieude,
                        MoTa: $scope.mota
                    },
                    url: current_url + '/api/SlideDetail/create-slide_detail',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Thêm thành công')
                    window.location='#!bannerslide/'+$scope.page
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
            }
            else{
                $http({
                    method: 'PUT',
                    data: {
                        MaAnh: $scope.MaSlide,
                        LinkAnh: $scope.hinhanh,
                        TieuDe: $scope.tieude,
                        MoTa: $scope.mota
                    },
                    url: current_url + '/api/SlideDetail/update-slide_detail',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Sửa thành công')
                    window.location='#!bannerslide/'+$scope.page
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }
        }
    }

})