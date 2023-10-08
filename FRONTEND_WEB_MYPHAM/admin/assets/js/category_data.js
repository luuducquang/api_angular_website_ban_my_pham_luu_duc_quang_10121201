
app.controller ('category', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("CategoryCtrl", function ($scope, $http) {
    $scope.ListDanhMuc;

    var datas = {
        page: $scope.page,
        pageSize: 10
    }

    var categoryName = document.querySelector('#categoryName')
    var status = document.querySelector('.status')
    var describe = document.querySelector('#describe')

    $scope.GetDanhMuc = function(){
        $http({
            method: 'POST',
            data: datas,
            url: current_url + '/api/DanhMuc/search-danhmuc',
        }).then(function (response) {  
            $scope.ListDanhMuc = response.data.data; 
            $scope.pageIndex(response.data.totalItems)
        });
        
        
    }
    $scope.GetDanhMuc();
    
    $scope.pageIndex = function(total){
        $('.page-count li').remove()
            var count = Math.ceil((total) / datas.pageSize)
            for (var i = 1; i < count + 1; i++) {
                let li = document.createElement('li')
                li.className = 'page-item'
                let a = document.createElement('a')
                a.className = 'page-link'
                // a.setAttribute("ng-click","nameValue("+i+")");
                li.appendChild(a)
                a.innerText = i
                $('.page-count').append(li)
                a.onclick = function () {
                    $scope.changePage(a.innerHTML)
                    a.href='#!category/'+a.innerHTML
                }
            }    
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                }
                window.location='#!category/'+$scope.page
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                }
                window.location='#!category/'+$scope.page
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

    $scope.AddCategory = function(){
        if(categoryName.value==='' || status.value==='undefined'|| describe.value==='undefined'){
            alert('không được bỏ trống')
            return
        }

        $http({
            method: 'POST',
            data: {
                TenDanhMuc: categoryName.value,
                DacBiet: Boolean(status.value),
                NoiDung: describe.value
            },
            url: current_url + '/api/DanhMuc/create-danhmuc',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) { 
            alert('Thêm thành công');
            window.location='#!category/1'
        })
        .catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        });
    }
    
    $scope.addCategory = function(){
        $scope.AddCategory(); 
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
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                window.location='#!category/1'
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
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
        if(categoryName.value==='' || status.value==='undefined'|| describe.value==='undefined'){
            alert('không được bỏ trống')
            return
        }
        else{
            $http({
                method: 'PUT',
                data: {
                    MaDanhMuc: $scope.maDanhMuc,
                    TenDanhMuc: categoryName.value,
                    DacBiet: Boolean(status.value),
                    NoiDung: describe.value
                },
                url: current_url + '/api/DanhMuc/update-danhmuc',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) { 
                alert('Sua thanh cong')
                window.location='#!category/1'
            })
            .catch(function (error) {
                console.error('Lỗi khi sua:', error);
            });
        }
    }

    change=function(){
        console.log(status.value);
    }
    
});