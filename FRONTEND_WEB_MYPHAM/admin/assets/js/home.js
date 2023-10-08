var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/product", {
    templateUrl : "product.html"
  })
  .when("/category/:page", {
    templateUrl : "category.html",
    controller: "category"
  })
});



