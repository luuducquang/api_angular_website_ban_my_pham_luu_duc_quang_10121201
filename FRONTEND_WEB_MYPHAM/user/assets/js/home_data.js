app.controller("HomeCtrl", function ($scope, $http) {
    $scope.GetUuDai= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10,Tendanhmucuudai:"FlagSale"},
            url: current_url + '/api/SanPham/search-sanpham',
        }).then(function (response) {  
            $scope.listUudai = response.data.data; 
        });
    };   
	$scope.GetUuDai();

});
