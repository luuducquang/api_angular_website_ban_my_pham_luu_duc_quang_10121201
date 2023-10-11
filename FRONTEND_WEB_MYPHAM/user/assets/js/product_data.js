app.controller ('product', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.id = $routeParams.id;
}]);

app.controller("ProductCtrl", function ($scope, $http) {
    $scope.ProductByid
    $http.get(current_url+'/api/SanPham/getbyid-sanpham/'+$scope.id)
    .then(function (response) {  
        $scope.ProductByid = response.data; 
        console.log(response.data); 
    });
})