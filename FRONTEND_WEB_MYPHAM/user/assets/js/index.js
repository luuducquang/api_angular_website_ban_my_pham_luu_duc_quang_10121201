var app = angular.module("Home", ["ngRoute"]);

app.filter('roundUp', function () {
    return function (input) {
        return Math.ceil(input);
    };
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })

    .when("/product/:id", {
        templateUrl : "product.html",
        controller: "product"
    })

    .when("/cart", {
        templateUrl : "cart.html"
    })
    
    .when("/order", {
        templateUrl : "order.html"
    })

    .when("/category/:page/:tendanhmucsearch", {
        templateUrl : "category.html",
        controller:"category"
    })
});

app.controller("IndexCtrl", function ($scope, $http) {
    $scope.GetDanhMuc = function(){
        $http.get(current_url+'/api/DanhMuc/get-all-danhmuc')
        .then(function (response) {  
            $scope.ListDanhMuc = response.data; 
        });
    }
    $scope.GetDanhMuc();

})

