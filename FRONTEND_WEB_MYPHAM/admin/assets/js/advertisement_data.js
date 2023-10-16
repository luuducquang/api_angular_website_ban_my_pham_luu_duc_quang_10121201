app.controller ('advertisement', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("AdvertisementCtrl", function ($scope, $http) {
    $scope.submit = "Thêm mới";
	$scope.listADS;	
    $scope.pageSize=10
    $scope.Image
    $scope.IdQuangCao

    $scope.GetADS= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: {
                page: $scope.page,
                pageSize: $scope.pageSize
            },
            url: current_url + '/api/QuangCao/search-quangcao',
        }).then(function (response) {  
            $scope.listADS = response.data.data
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetADS();

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
                    a.href='#!advertisement/'+a.innerHTML
                }
            }    

            aItem[currentPage - 1].classList.add('activePage');
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    window.location='#!advertisement/'+$scope.page
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    window.location='#!advertisement/'+$scope.page
                }
            }
    }
    
    $scope.changePage=function(i) {
        $scope.page = i
    }

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.id);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.id);
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
                url: current_url + '/api/QuangCao/delete-quangcao2',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Xoá thành công')
                window.location='#!advertisement/'+$scope.page
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
        $scope.link=''
        $scope.mota=''
        preview.src=''
    }

    $scope.save = function(){
        if($scope.link===''||$scope.mota===''){
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
                            AnhDaiDien: "../img"+$scope.Image,
                            LinkQuangCao: $scope.link,
                            MoTa: $scope.mota
                        },
                        url: current_url + '/api/QuangCao/create-quangcao',
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
                            Id: $scope.IdQuangCao,
                            AnhDaiDien: "../img"+$scope.Image,
                            LinkQuangCao: $scope.link,
                            MoTa: $scope.mota
                        },
                        url: current_url + '/api/QuangCao/update-quangcao',
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
                        AnhDaiDien: "../img"+$scope.Image,
                        LinkQuangCao: $scope.link,
                        MoTa: $scope.mota
                    },
                    url: current_url + '/api/QuangCao/create-quangcao',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Thêm thành công')
                    window.location='#!advertisement/'+$scope.page
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
            }
            else{
                $http({
                    method: 'PUT',
                    data: {
                        Id: $scope.IdQuangCao,
                        AnhDaiDien: $scope.hinhanh,
                        LinkQuangCao: $scope.link,
                        MoTa: $scope.mota
                    },
                    url: current_url + '/api/QuangCao/update-quangcao',
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {  
                    alert('Sửa thành công')
                    window.location='#!advertisement/'+$scope.page
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }
        }
    }

    $scope.edit = function(x){
        $scope.submit = "Chỉnh sửa";
        $(".product-container").toggleClass("hide")
        $scope.IdQuangCao = x.id
        $scope.link = x.linkQuangCao
        $scope.mota = x.moTa
        $scope.hinhanh = x.anhDaiDien
        preview.src = x.anhDaiDien
    }
})