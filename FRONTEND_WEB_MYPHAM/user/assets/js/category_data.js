app.controller ('category', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.tendanhmucsearch = $routeParams.tendanhmucsearch;
}]);

app.controller("CategoryCtrl", function ($scope, $http) {
    var datas = {
        page:$scope.page,
        pageSize:10,
        TenDanhMuc:$scope.tendanhmucsearch
    }
    $scope.GetProduct= function () {
        $http({
            method: 'POST',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            console.log($scope.listItem);
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
    $scope.GetProduct()

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
                    a.href='#!category/'+a.innerHTML+'/'+$scope.tendanhmucsearch
                    
                }
            }    

            aItem[currentPage - 1].classList.add('activePage');
            
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
                }
            }
    }
    
    $scope.changePage=function(i) {
        datas.page = i
    }
})