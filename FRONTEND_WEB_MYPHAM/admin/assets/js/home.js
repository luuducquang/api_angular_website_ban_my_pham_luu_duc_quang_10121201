var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "overview.html"
  })
  .when("/product/:page", {
    templateUrl : "product.html",
    controller: "product"
  })
  .when("/product/:page/:pricemin/:valuepricemin/:pricemax/:valuepricemax/:key/:value", {
    templateUrl : "product.html",
    controller: "product"
  })
  .when("/product/:page/:pricemin/:valuepricemin/:pricemax/:valuepricemax", {
    templateUrl : "product.html",
    controller: "product"
  })
  .when("/category/:page", {
    templateUrl : "category.html",
    controller: "category"
  })
  .when("/category/:page/:tendanhmucsearch", {
    templateUrl : "category.html",
    controller: "category"
  })
  .when("/categoryOffer/:page", {
    templateUrl : "categoryOffer.html",
    controller: "categoryOffer"
  })
  .when("/categoryOffer/:page/:tendanhmucuudaisearch", {
    templateUrl : "categoryOffer.html",
    controller: "categoryOffer"
  })
  .when("/manufacturer/:page", {
    templateUrl : "manufacturer.html",
    controller: "manufacturer"
  })
  .when("/manufacturer/:page/:tenhangsearch", {
    templateUrl : "manufacturer.html",
    controller: "manufacturer"
  })
  .when("/distributor/:page", {
    templateUrl : "distributor.html",
    controller: "distributor"
  })
  .when("/distributor/:page/:key/:value", {
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
  .when("/account/:page/:key/:value", {
    templateUrl : "account.html",
    controller: "account"
  })
  .when("/billSell/:page", {
    templateUrl : "billSell.html",
    controller: "billSell"
  })
  .when("/billSell/:page/:start/:valuestart/:end/:valueend", {
    templateUrl : "billSell.html",
    controller: "billSell"
  })
  .when("/billSell/:page/:start/:valuestart/:end/:valueend/:key/:value", {
    templateUrl : "billSell.html",
    controller: "billSell"
  })
  .when("/importBill/:page", {
    templateUrl : "importBill.html",
    controller: "importBill"
  })
  .when("/importBill/:page/:start/:valuestart/:end/:valueend", {
    templateUrl : "importBill.html",
    controller: "importBill"
  })
  .when("/importBill/:page/:start/:valuestart/:end/:valueend/:npp", {
    templateUrl : "importBill.html",
    controller: "importBill"
  })
  .when("/feedback/:page", {
    templateUrl : "feedback.html",
    controller: "feedback"
  })
  .when("/feedback/:page/:start/:valuestart/:end/:valueend", {
    templateUrl : "feedback.html",
    controller: "feedback"
  })
  .when("/feedback/:page/:start/:valuestart/:end/:valueend/:noidung", {
    templateUrl : "feedback.html",
    controller: "feedback"
  })
  .when("/feedback/:page/:start/:valuestart/:end/:valueend/:noidung/:chatluong", {
    templateUrl : "feedback.html",
    controller: "feedback"
  })
});

const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const VND2 = new Intl.NumberFormat('vi-VN');

var userLocalStorage = JSON.parse(localStorage.getItem("user"))
if(userLocalStorage){
  document.querySelector('.nameUser').innerHTML=userLocalStorage.hoten
  document.querySelector('.imgUser').src=userLocalStorage.anhdaidien
}
if(!userLocalStorage){
  window.location.href = './login.html'
}

logoutUser = function(){
  window.location.href='./login.html'
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

var currentDate = new Date();
var gmt7Time = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);
var gmt7ISODate = gmt7Time.toISOString().slice(0, 16);

var contentLeft = document.querySelector('.content-left')
var contentRight = document.querySelector('.container-right')
var iconCircleRight = document.querySelector('.menuOption')
var iconCircleRightI = document.querySelector('.menuOption i')


if(JSON.parse(localStorage.getItem('menu')) === false){
  contentLeft.style.marginLeft = "-250px";
  contentRight.style.marginLeft = "0px";
  iconCircleRight.style.marginLeft = "-35px";
}
else{
  iconCircleRight.style.marginLeft = "228px";
}


hidemenu=function(){
  contentLeft.style.animation=''
  iconCircleRight.style.animation=''
  contentRight.style.animation = 'leftTorightMargin linear .3s'
  contentLeft.style.animation = 'leftToright linear .3s'
  iconCircleRight.style.animation = 'leftTorightMargin2 linear .32s'
  iconCircleRightI.style.animation = 'rotateto180 linear .32s'
  setTimeout(function(){
    contentLeft.style.marginLeft = "-250px";
    iconCircleRight.style.marginLeft = "-35px";
    contentRight.style.marginLeft = "0px";
    iconCircleRightI.style.transform = "rotate(180deg)";
  },300)
  isMenu = false
  localStorage.setItem('menu',isMenu)
}

showmenu=function(){
  contentLeft.style.animation=''
  iconCircleRight.style.animation=''
  contentRight.style.animation = 'rightToleftMargin linear .3s'
  contentLeft.style.animation = 'rightToleft linear .3s'
  iconCircleRight.style.animation = 'rightToleftMargin2 linear .3s'
  iconCircleRightI.style.animation = 'rotateto0 linear .32s'
  setTimeout(function(){
    contentLeft.style.marginLeft = "0px";
    iconCircleRight.style.marginLeft = "228px";
    contentRight.style.marginLeft = "250px";
    iconCircleRightI.style.transform = "rotate(0deg)";
  },300)
  isMenu =true
  localStorage.setItem('menu',isMenu)
}
