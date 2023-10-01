function ShopAmount(){
    valueShop = localStorage.getItem("ValueShop") ? JSON.parse(localStorage.getItem("ValueShop")) : []
    var shopvalue = document.querySelector(".shopping .shop")
    var x=``
    valueShop.map((value,index)=>{
        x += `<span class="value-cart">${index+1}</span>`
    })
    shopvalue.innerHTML = x
    
}

ShopAmount()





// const btn = document.querySelectorAll(".home-product-item .home-product-item_price .home-add-item")

// btn.forEach(function(button,index){
//     button.addEventListener("click",function(event){
//         var btnItem=event.target
//         var btnItem2=btnItem.parentElement
//         var product=btnItem2.parentElement
//         var productImg = product.querySelector("img").src
//         var productName = product.querySelector(".home-product-item_name").innerText
//         var productPrice = product.querySelector(".home-product-item_price .home-product-item_price_current").innerText
//         console.log(productPrice);
//         addcart(productImg,productName,productPrice)
//     })  
// });

// function addcart(productImg,productName,productPrice){
//     var tbody = document.querySelectorAll("tbody tr")
//     for (let i = 0; i < tbody.length; i++) {
//         var NameItem = tbody[i].querySelector(".nameItem").innerHTML
//         var input = tbody[i].querySelector(".amount")
//         var ValueInput = input.value
//         if(NameItem===productName){
//             ValueInput++
//             input.value = ValueInput
//             totalcart()
//             EditAmount()
//             return
//         }
//     }
//     var Cart = document.querySelector(".value-cart")
//     valueCart = Cart.innerHTML
//     valueCart++
//     Cart.innerHTML=valueCart
//     var addtr = document.createElement("tr")
//     content = '<tr> <td style=" display: flex; align-items: center;"><img style="width: 30%;"src="'+productImg+'" alt=""><span class="nameItem">'+productName+'</span></td> <td><p><span class="price-item">'+productPrice+'</span><sup>đ</sup></p></td> <td> <div class="buy-amount" style="display: flex;"> <button style="height: 30px; width: 30px; outline: none; background-color: #ddd;border: none; cursor: pointer;" class="ti-minus minus"></button> <input style="width: 30px; height: 30px; text-align: center; border:none; " type="text" value="1" min="1" class="amount"> <button style="height: 30px; width: 30px; outline: none; background-color: #ddd;border: none; cursor: pointer;" class="ti-plus plus"></button> </div> </td> <td style="cursor: pointer;"><span class="delete-cart">Xoá</span> </td> </tr>'
//     addtr.innerHTML = content
//     var carTable = document.querySelector("tbody")
//     carTable.append(addtr)
//     totalcart()
//     deletecart()
//     EditAmount()
// }

// function totalcart(){
//     var tbody = document.querySelectorAll("tbody tr")
//     var totalPrice = 0
//     for (let i = 0; i < tbody.length; i++) {
//         var inputValue = tbody[i].querySelector(".amount").value
//         var productValue = tbody[i].querySelector(".price-item").innerHTML
//         var Price = inputValue*productValue*1000    
//         totalPrice += Price 
        
//     }
//     var PriceAll = document.querySelector(".totalPrice")
//     PriceAll.innerHTML = totalPrice.toLocaleString("de-DE")
// }


// function deletecart(){
//     var tbody = document.querySelectorAll("tbody tr")
//     for (let i = 0; i < tbody.length; i++) {
//         var del = tbody[i].querySelector(".delete-cart")
//         del.addEventListener("click",function(event){
//         var del1 = event.target
//         var del2 = del1.parentElement
//         var del3 = del2.parentElement
//         del3.remove()
//         totalcart()
//     }) 
//     }
// }


// function EditAmount(){
//     var tbody = document.querySelectorAll("tbody tr")
//     for (let i = 0; i < tbody.length; i++) {
//         var btnplus = tbody[i].querySelector(".plus")
//         var btnminus = tbody[i].querySelector(".minus")
//         var input = tbody[i].querySelector(".amount")
//         var inputValue = input.value
//     }
//     function UpdateAmount(inputValue){
//         input.value= inputValue
//     }

//     btnplus.addEventListener("click",function(){
//         inputValue++
//         UpdateAmount(inputValue)
//         totalcart()
//     })

//     btnminus.addEventListener("click",function(){
//         if(inputValue>1){
//             inputValue--
//             UpdateAmount(inputValue)
//             totalcart()
//         }
//     })

//     input.addEventListener("input",function(){
//         inputValue = input.value
//         inputValue = parseInt(inputValue)
//         if(isNaN(inputValue)||inputValue===0)
//         {
//             inputValue=1
//             UpdateAmount(inputValue)
//             totalcart()
//         }
//         totalcart()
//     })
// }

// var body = document.querySelector("body")
// var btnShop = document.querySelector(".shop")
// var cart = document.querySelector(".cart")
// var displaycart = cart.style.display = 'none'
// btnShop.addEventListener("click",function(){
//     if(displaycart=='none'){
//         displaycart = cart.style.display = 'block'
//     }
//     else
//     {
//         displaycart = cart.style.display = 'none'
//     }
// })

// body.addEventListener("click",function(){
//     displaycart = cart.style.display = 'none'
// })

// btnShop.addEventListener("click",function(event){
//     event.stopPropagation()
// })
// cart.addEventListener("click",function(event){
//     event.stopPropagation()
// })


