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
    window.location = '../BaiTapLonSkincare/order.html'
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
var AmounProduct = document.querySelector(".amount").value
var addItem = document.querySelector(".add-item")
var buyNow = document.querySelector(".buy-now")
var country = document.querySelector('.country-origin').innerHTML
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
    var search = listProduct.find(x => x.name === Nameproduct)
    if(search){
        listProduct.map((value,index)=>{
            value.amount++
        })
        localStorage.setItem("productList",JSON.stringify(listProduct))
        productLast('Sản phẩm đã có trong giỏ hàng','block')
        return
    }
    else{
        listProduct.push({  
            img : Imgproduct,
            name : Nameproduct,
            priceOld : priceO,
            price : PriceProduct,
            size : SizeProduct,
            amount : AmounProduct,
            countryItem :country,
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
            amount : AmounProduct,
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
    
    console.log(e.clientX,e.pageX);

})