app.controller ('bannerslide', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("BannerSlideCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[11]).addClass('active_option')

    document.title = 'Banner Slide'
    
    $scope.submit = "Thêm mới";
	$scope.listSlide;	
    $scope.pageSize=10
    $scope.Image
    $scope.MaSlide

    $scope.GetSlide= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: {
                page: $scope.page,
                pageSize: $scope.pageSize
            },
            url: current_url + '/api-admin/SlideDetail/search-slide',
        }).then(function (response) {  
            $scope.listSlide = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetSlide();

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
                    window.location='#!bannerslide/'+pageNumber
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    window.location='#!bannerslide/'+pageNumber
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                window.location='#!bannerslide/'+pageNumber
            },
            afterPreviousOnClick:function(event,pageNumber){
                window.location='#!bannerslide/'+pageNumber
                
            },
            afterPageOnClick : function(event,pageNumber){
                window.location='#!bannerslide/'+pageNumber
            }
        })
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
                url: current_url + '/api-admin/SlideDetail/delete-slide_detail',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
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
                url: current_url + '/api-admin/Image/upload',
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
                        url: current_url + '/api-admin/SlideDetail/create-slide_detail',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        alert('Thêm thành công')
                    }).catch(function (error) {
                        console.error('Lỗi khi thêm sản phẩm:', error);
                    });
                }
                else{
                    if(confirm("Bạn có muốn sửa thông tin slide không !")){
                        $http({
                            method: 'PUT',
                            data: {
                                MaAnh: $scope.MaSlide,
                                LinkAnh: "../img"+$scope.Image,
                                TieuDe: $scope.tieude,
                                MoTa: $scope.mota
                            },
                            url: current_url + '/api-admin/SlideDetail/update-slide_detail',
                            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                        }).then(function (response) {  

                        }).catch(function (error) {
                            console.error('Lỗi khi sửa sản phẩm:', error);
                        });
                    }
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
                    url: current_url + '/api-admin/SlideDetail/create-slide_detail',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    alert('Thêm thành công')
                    window.location='#!bannerslide/'+$scope.page
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
            }
            else{
                if(confirm("Bạn có muốn sửa thông tin slide không !")){
                    $http({
                        method: 'PUT',
                        data: {
                            MaAnh: $scope.MaSlide,
                            LinkAnh: $scope.hinhanh,
                            TieuDe: $scope.tieude,
                            MoTa: $scope.mota
                        },
                        url: current_url + '/api-admin/SlideDetail/update-slide_detail',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        window.location='#!bannerslide/'+$scope.page
                    }).catch(function (error) {
                        console.error('Lỗi khi sửa sản phẩm:', error);
                    });
                }
            }
        }
    }

})