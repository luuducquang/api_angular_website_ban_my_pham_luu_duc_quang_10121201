var app = angular.module("Home", ["ngRoute"]);
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
});