var app = angular.module('SaleHome', []);
app.controller("HomeCtrl", function ($scope, $http) {
    $scope.listMenu;
	$scope.listItem;	
    // $scope.LoadMenu= function () {
    //     $http({
    //         method: 'GET',
    //         url: current_url + '/api/SanPham/search-sanpham',
    //     }).then(function (response) {  
    //         $scope.listMenu = response.data;  
    //         console.log($scope.listMenu)
    //     });
    // };
	 
    $scope.GetBanChay= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10,Tendanhmucuudai:"FlagSale"},
            url: current_url + '/api/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            console.log($scope.listItem); 
        });
    };   
	$scope.GetBanChay();
});
