app.controller ('product', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.id = $routeParams.id;
}]);

app.controller("ProductCtrl", function ($scope, $http) {

    $scope.ProductByid
    $scope.listImgDetail
    

    $http.get(current_url+'/api/SanPham/getbyid-sanpham/'+$scope.id)
    .then(function (response) {  
        $scope.ProductByid = response.data; 
        console.log();
        $http({
            method: 'GET',
            // headers: { "Authorization": 'Bearer ' + _user.token },
            url: current_url + '/api/SanPham/getbyid-anhsanphamdetail/' + response.data.maSanPham,
        }).then(function(response){
            $scope.listImgDetail = response.data

            var menuInf = document.querySelector(".menu-inf")
            window.addEventListener("scroll",function(){
                var x = window.pageYOffset
                if(x>550){
                    menuInf.classList.add("menu-inf-fix")
                }
                else{
                    menuInf.classList.remove("menu-inf-fix")
                }
            })



            var menuclick = document.querySelectorAll(".menu-inf li")
            menuclick.forEach(function(menuItem){
                menuItem.addEventListener("click",function(){
                    document.documentElement.scrollTop=menuItem.dataset.scroll
                })

            })

            var goToTop = document.querySelector(".go-to-top")
            var colorMenu = document.querySelectorAll(".color-menu")

            window.addEventListener("scroll",function(){
                var x = window.pageYOffset
                for (let i = 0; i < colorMenu.length; i++) {
                    if(x>520  & x<1186){
                        colorMenu[0].classList.add('color-scroll')
                    }
                    if(x>1186 & x<1484){
                        colorMenu[1].classList.add('color-scroll')
                
                    }
                    if(x>1484 & x<1900){
                        colorMenu[2].classList.add('color-scroll')
                    }
                    if(x>1900 & x<2020){
                        colorMenu[3].classList.add('color-scroll')
                    }
                    if(x>2050){
                        colorMenu[4].classList.add('color-scroll')
                    }
                    else{
                        colorMenu[i].classList.remove('color-scroll')
                    }
                    
                }
            })



            var buy = document.querySelector(".buy-now")
            buy.addEventListener("click",function(){
                window.location = '#!/order'
            })


            function updateAmount(amount){
                    amount.value = valueAmount
                }

                
            var plus = document.querySelector(".plus")
            var minus = document.querySelector(".minus")
            var amount = document.querySelector(".amount")
            var valueAmount = amount.value
            plus.addEventListener("click",function(){
                valueAmount++
                updateAmount(amount)
            })

            minus.addEventListener("click",function(){
                    if(valueAmount>1){
                            valueAmount--
                            updateAmount(amount)
                        }
                    })
                    
            amount.addEventListener("input",function(){
                    valueAmount = amount.value
                    valueAmount = parseInt(valueAmount)
                    if(isNaN(valueAmount) || valueAmount===0){
                            valueAmount = 1
                        }
                        updateAmount(amount)
                    })




            var Imgproduct = document.querySelector(".product-item-img img").src
            var Nameproduct = document.querySelector(".product-item-name").innerHTML
            var PriceProduct = document.querySelector(".product-item_price_current").innerHTML
            var SizeProduct = document.querySelector(".size").innerHTML
            var AmounProduct = document.querySelector(".amount")
            var addItem = document.querySelector(".add-item")
            var buyNow = document.querySelector(".buy-now")
            // var country = document.querySelector('.country-origin').innerHTML
            var price = document.querySelector(".product-item_price_old")
            if(price){
                var priceO = price.innerHTML
            }
            else{
                var priceO = PriceProduct
            }


            function ShopAmount(){
                valueShop = localStorage.getItem("ValueShop") ? JSON.parse(localStorage.getItem("ValueShop")) : []
                var shopvalue = document.querySelector(".shopping .shop")
                var x=``
                valueShop.map((value,index)=>{
                    x += `<span class="value-cart">${index+1}</span>`
                })
                shopvalue.innerHTML = x
            }


            var z = 0
            addItem.addEventListener("click",function(){
                var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
                var search = listProduct.find(x => x.name === $scope.ProductByid.tenSanPham)
                if(search){
                    search.amount = Number(search.amount) + Number(AmounProduct.value)
                    localStorage.setItem("productList",JSON.stringify(listProduct))
                    productLast('Sản phẩm đã có trong giỏ hàng','block')
                    return
                }
                else{
                    listProduct.push({  
                        id : $scope.ProductByid.maSanPham,
                        img : $scope.ProductByid.anhDaiDien,
                        name : $scope.ProductByid.tenSanPham,
                        priceOld : $scope.ProductByid.gia,
                        price : $scope.ProductByid.giaGiam,
                        size : $scope.ProductByid.trongLuong,
                        amount : AmounProduct.value,
                        countryItem :$scope.ProductByid.xuatXu
                    })
                    localStorage.setItem("productList",JSON.stringify(listProduct))
                    
                    valueShop = localStorage.getItem("ValueShop") ? JSON.parse(localStorage.getItem("ValueShop")) : []
                    valueShop.push({
                        amountCart : 0
                    })
                    localStorage.setItem("ValueShop",JSON.stringify(valueShop))
                    
                    ShopAmount()

                    productLast('Sản phẩm đã được thêm vào giỏ hàng','block')
                }

            })


            function productLast(title,display = 'none'){
                var frame = document.getElementById("frame")
                var chilFrame = document.createElement("div")
                chilFrame.style.display = `${display}`
                chilFrame.classList.add('last')
                var productLast = document.createElement('div')
                productLast.classList.add('product-last')
                productLast.innerHTML=`<div class="product-last">
                                        <div class="product-last-icon">
                                            <i class="fa-solid fa-circle-check"></i>
                                        </div>
                                        <div class="product-last-name">
                                            ${title}
                                        </div>
                                    </div>`
                                    frame.appendChild(chilFrame)
                                    chilFrame.appendChild(productLast)
                                    setTimeout(function(){
                                        chilFrame.removeChild(productLast)
                                        chilFrame.style.display = 'none'
                                    },2500)

                                    
            }




            buyNow.addEventListener("click",function(){
                var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
                var search = listProduct.find(x => x.name === Nameproduct)
                if(search){
                    listProduct.map((value,index)=>{
                        value.amount++
                    })
                    localStorage.setItem("productList",JSON.stringify(listProduct))

                    return
                }
                else{
                    listProduct.push({  
                        img : Imgproduct,
                        name : Nameproduct,
                        price : PriceProduct,
                        size : SizeProduct,
                        amount : AmounProduct.value,
                    })
                    localStorage.setItem("productList",JSON.stringify(listProduct))
                    
                    valueShop = localStorage.getItem("ValueShop") ? JSON.parse(localStorage.getItem("ValueShop")) : []
                    valueShop.push({
                        amountCart : 0
                    })
                    localStorage.setItem("ValueShop",JSON.stringify(valueShop))
                    ShopAmount()

                    
                }
            })


            var miror = document.querySelector(".miror")
            var img = document.querySelector(".product-item-img img")
            miror.style.display='none'


            img.addEventListener("mouseleave",function(e){
                miror.style.display='none'

            })
            // vi tri ngang chuot di vao anh
            // chieu rong cao anh
            img.addEventListener("mousemove",function(e){
                img.style.cursor = 'none'
                miror.style.display='block' 
                
                miror.style.top =  e.pageY +'px'
                miror.style.left = e.pageX +'px'
                
                let w = e.target.offsetWidth;
                let h = e.target.offsetHeight;
                
                let mouseWidthImg = e.pageX 
                let mouseHeightImg = e.pageY
                
                let percentX = (mouseWidthImg / w)*100
                let percentY = (mouseHeightImg / h)*100
                
                miror.style.backgroundPositionX = percentX - 30 +'%'
                miror.style.backgroundPositionY = percentY -42 +'%'
                
                miror.style.backgroundImage = `url(${img.src})`
                

            })

            
            var imgP = document.querySelector(".product-item-img img")

            function updateActive(i){
                var acti = document.querySelector('.img-slider .activeImg')
                if(acti){
                    acti.classList.remove('activeImg')
                }
                var opaci = document.querySelector(".img-slider .opacity1")
                if(opaci){
                    opaci.classList.remove('opacity1')
                    opaci.classList.add('opacity')

                }
                listImg[i].classList.add('activeImg')

                listImg[i].classList.add('opacity1')
            }


            var images = [];
            images = $scope.listImgDetail.map(function(value){
                return `<img src="${value.linkAnh}" alt="">`;
            });

            var imgSlider = document.querySelector(".img-slider");
            
            imgSlider.innerHTML=''
            images.forEach(function(image) {
                imgSlider.innerHTML += image;
            });
            
            var listImg = document.querySelectorAll(".img-slider img")

            listImg.forEach(function(e,i){
                e.addEventListener("click",function(){
                    imgP.style.opacity = '0'
                    setTimeout(function(){
                        index = i
                        var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
                        updateActive(i)
                        imgP.style.opacity = '1'
                    },300)
                })    
                e.classList.add('opacity')

            })


            index  = 0

            function Next(){
                imgP.style.opacity = '0'
                setTimeout(function(){
                    index++
                    if(index >= listImg.length){
                    index=0
                    }
                    var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
                    updateActive(index)
                    imgP.style.opacity = '1'
                    
                },100)
                
            }

            function Prev(){
                imgP.style.opacity = '0'
                setTimeout(function(){
                    index--
                    if(index<0){
                        index = listImg.length-1
                    }
                    var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
                    updateActive(index)
                    imgP.style.opacity = '1'
                },100)
            }


            var icon = document.querySelector('.but')

            var Pleft = document.querySelector('.product-left')
            Pleft.addEventListener("mouseover",function(){
                icon.style.display = 'block'
            })

            Pleft.addEventListener("mouseleave",function(){
                icon.style.display = 'none'
            })

            setInterval(function(){
                Next()
            },3000)

            $scope.GetProductConnect= function () {
                $http({
                    method: 'POST',
                    data: { page: 1, pageSize: 5,TenDanhMuc:$scope.ProductByid.tenDanhMuc},
                    url: current_url + '/api/SanPham/search-sanpham',
                }).then(function (response) {  
                    $scope.listConnect = response.data.data; 
                });
            };   
            $scope.GetProductConnect();

        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
    });
    
    $scope.reloadPage = function() {
        window.location.reload();
    };
})