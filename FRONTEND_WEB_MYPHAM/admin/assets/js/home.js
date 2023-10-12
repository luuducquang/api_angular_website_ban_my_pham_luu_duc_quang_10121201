var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/product/:page", {
    templateUrl : "product.html",
    controller: "product"
  })
  .when("/category/:page", {
    templateUrl : "category.html",
    controller: "category"
  })
  .when("/categoryOffer/:page", {
    templateUrl : "categoryOffer.html",
    controller: "categoryOffer"
  })
  .when("/manufacturer/:page", {
    templateUrl : "manufacturer.html",
    controller: "manufacturer"
  })
  .when("/distributor/:page", {
    templateUrl : "distributor.html",
    controller: "distributor"
  })
  .when("/advertisement/:page", {
    templateUrl : "advertisement.html",
    controller: "advertisement"
  })
  .when("/bannerslide/:page", {
    templateUrl : "bannerslide.html",
    controller: "bannerslide"
  })
  .when("/typeaccount", {
    templateUrl : "typeaccount.html"
  })
  .when("/account/:page", {
    templateUrl : "account.html",
    controller: "account"
  })
  .when("/billSell/:page", {
    templateUrl : "billSell.html",
    controller: "billSell"
  })
  .when("/importBill/:page", {
    templateUrl : "importBill.html",
    controller: "importBill"
  })
});

var userLocalStorage = JSON.parse(localStorage.getItem("user"))
if(userLocalStorage){
  document.querySelector('.nameUser').innerHTML=userLocalStorage.hoten
  document.querySelector('.imgUser').src=userLocalStorage.anhdaidien
}
if(!userLocalStorage){
  window.location.href = './login.html'
}

logoutUser = function(){
  localStorage.setItem("user",null)
}

var _user = JSON.parse(localStorage.getItem("user"));

function time() {
  var today = new Date();
  var weekday = new Array(7);
  weekday[0] = "Chủ Nhật";
  weekday[1] = "Thứ Hai";
  weekday[2] = "Thứ Ba";
  weekday[3] = "Thứ Tư";
  weekday[4] = "Thứ Năm";
  weekday[5] = "Thứ Sáu";
  weekday[6] = "Thứ Bảy";
  var day = weekday[today.getDay()];
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var h = today.getHours();
  var m = today.getMinutes();

  m = checkTime(m);
  nowTime = h + " giờ " + m + " phút ";
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = day + ', ' + dd + '/' + mm + '/' + yyyy;
  tmp = '<span class="date"> ' + today + ' - ' + nowTime +
    '</span>';
  document.getElementById("clock").innerHTML = tmp;
  clocktime = setTimeout("time()", "1000", "Javascript");

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
}