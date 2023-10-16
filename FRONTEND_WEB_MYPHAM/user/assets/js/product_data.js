app.controller ('product', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.id = $routeParams.id;
}]);

app.controller("ProductCtrl", function ($scope, $http) {
    $scope.ProductByid
    $scope.listImgDetail

    $http.get(current_url+'/api/SanPham/getbyid-sanpham/'+$scope.id)
    .then(function (response) {  
        $scope.ProductByid = response.data; 
        $http({
            method: 'GET',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api/SanPham/getbyid-anhsanphamdetail/' + response.data.maSanPham,
        }).then(function(response){
            $scope.listImgDetail = response.data
            console.log($scope.listImgDetail);
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
    });
    
})