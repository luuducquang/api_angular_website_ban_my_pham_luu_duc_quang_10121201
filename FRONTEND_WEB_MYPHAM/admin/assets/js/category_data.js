app.controller ('category', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.tendanhmucsearch = $routeParams.tendanhmucsearch;
}]);

app.controller("CategoryCtrl", function ($scope, $http) {
    $scope.ListDanhMuc;

    var datas = {
        page: $scope.page,
        pageSize: 10,
        TenDanhMuc: $scope.tendanhmucsearch
    }

    var categoryName = document.querySelector('#categoryName')
    var status = document.querySelector('.status')
    var describe = document.querySelector('#describe')

    $scope.GetDanhMuc = function(){
        $http({
            method: 'POST',
            data: datas,
            url: current_url + '/api/DanhMuc/search-danhmuc',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {  
            $scope.ListDanhMuc = response.data.data; 
            $scope.pageIndex(response.data.totalItems)
        });
        
        
    }
    $scope.GetDanhMuc();

    //-------------------------------------------------------------------------------//
    $scope.timkiem = $scope.tendanhmucsearch
    $scope.search = function(){
        if($scope.timkiem===undefined){
            $scope.tendanhmucsearch=''
        }
        else{
            $scope.tendanhmucsearch = $scope.timkiem
            var data = {
                page: 1,
                pageSize: 10,
                TenDanhMuc: $scope.tendanhmucsearch
            };
            $http({
                method: 'POST',
                // headers: { "Authorization": 'Bearer ' + _user.token },
                data: data,
                url: current_url + '/api/DanhMuc/search-danhmuc',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                console.log(response);
                if(response.data.totalItems===0){
                    alert("Không có danh mục nào")
                    $scope.tendanhmucsearch =''
                    return
                }
                else{
                    window.location='#!category/1/'+$scope.tendanhmucsearch
                }
            }).catch(function (error) {
                console.error('Lỗi :', error);
            });
        }
    }
    //-------------------------------------------------------------------------------//
    
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
                    if($scope.tendanhmucsearch){
                        a.href='#!category/'+a.innerHTML+'/'+$scope.tendanhmucsearch
                    }
                    else{
                        a.href='#!category/'+a.innerHTML
                    }
                }
            }    

            aItem[currentPage - 1].classList.add('activePage');
            
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    if($scope.tendanhmucsearch){
                        window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
                    }
                    else{
                        window.location='#!category/'+$scope.page
                    }
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    if($scope.tendanhmucsearch){
                        window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
                    }
                    else{
                        window.location='#!category/'+$scope.page
                    }
                }
            }
    }
    

    $scope.changePage=function(i) {
        datas.page = i
        $scope.GetDanhMuc()
    }

    $scope.checkCategory =[]

    $scope.toggleSelection = function(item){
        var idx = $scope.checkCategory.indexOf(item.maDanhMuc);
        if(idx >-1){
            $scope.checkCategory.splice(idx, 1);
        }
        else{
            $scope.checkCategory.push(item.maDanhMuc);
        }
    }

    yesdel = function(){
        if($scope.checkCategory.length === 0){
            alert("chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'DELETE',
                data: $scope.checkCategory,
                url: current_url + '/api/DanhMuc/delete-danhmuc',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                alert('Xoá thành công')
                if($scope.tendanhmucsearch){
                    window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
                }
                else{
                    window.location='#!category/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.btnAdd=function(){
        categoryName.value=''
        describe.value=''
    }

    $scope.AddCategory = function(){
        if(categoryName.value==='' || describe.value===''){
            alert('không được bỏ trống')
            return
        }

        $http({
            method: 'POST',
            data: {
                TenDanhMuc: categoryName.value,
                DacBiet: status.value === "true",
                NoiDung: describe.value
            },
            url: current_url + '/api/DanhMuc/create-danhmuc',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {
            alert('Thêm thành công');
            if($scope.tendanhmucsearch){
                window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
            }
            else{
                window.location='#!category/'+$scope.page
            }
        })
        .catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        });
    }
    
    $scope.addCategory = function(){
        $scope.AddCategory(); 
    }

    
    $scope.maDanhMuc
    $scope.edit=function(x){
        $(".product-container").toggleClass("hide")
        categoryName.value = x.tenDanhMuc
        status.value = x.dacBiet
        describe.value = x.noiDung
        document.querySelector('.saveAdd').style.display = 'none'
        document.querySelector('.saveEdit').style.display = 'block'
        $scope.maDanhMuc = x.maDanhMuc
    }

    $scope.editCategory=function(){
        if(categoryName.value==='' || status.value===undefined|| describe.value==='undefined'){
            alert('không được bỏ trống')
            return
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaDanhMuc: $scope.maDanhMuc,
                    TenDanhMuc: categoryName.value,
                    DacBiet: status.value === "true",
                    NoiDung: describe.value
                },
                url: current_url + '/api/DanhMuc/update-danhmuc',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                alert('Sửa thành công')
                if($scope.tendanhmucsearch){
                    window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
                }
                else{
                    window.location='#!category/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi sua:', error);
            });
        }
    }

    
});