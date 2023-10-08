
app.controller ('category', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
}]);

app.controller("CategoryCtrl", function ($scope, $http) {
    $scope.ListDanhMuc;

    var datas = {
        page: $scope.page,
        pageSize: 10
    }

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
        var idx = $scope.checkCategory.indexOf(item);
        if(idx >-1){
            $scope.checkCategory.splice(idx, 1);
            console.log($scope.checkCategory);
            console.log(idx);
        }
        else{
            $scope.checkCategory.push(item);
            console.log($scope.checkCategory);
            console.log(idx);
        }
    }

    $scope.AddCategory = function(){
        if($scope.nameCategory===undefined || $scope.status===undefined|| $scope.describe===undefined){
            alert('không được bỏ trống')
            return
        }

        $http({
            method: 'POST',
            data: {
                TenDanhMuc: $scope.nameCategory,
                DacBiet: Boolean($scope.status),
                NoiDung: $scope.describe
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

    $scope.yesdel = function(){
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

    $scope.edit=function(x){
        $(".product-container").toggleClass("hide")
        $scope.nameCategory = x.tenDanhMuc
        $scope.status = x.dacBiet
        $scope.describe = x.noiDung
        console.log($scope.status );
    }

    
});