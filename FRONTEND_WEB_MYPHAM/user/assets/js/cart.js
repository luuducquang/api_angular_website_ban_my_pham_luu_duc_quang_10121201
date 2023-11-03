function product(){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var tbody = document.querySelector(".cart-shop table tbody")
    var content = ``
    listProduct.map(function(value,index){
        content += `<tr>
                        <td style=" height:90px; display: flex; align-items: center;"><img style="width: 90px;padding: 10px;" src="${value.img}" alt="">
                        <span class="item">
                            <a style="text-decoration: none; color:black;" href="#!/product/${value.id}" style="font-size: 14px;" class="nameItem">${value.name}</a>
                            <div style="margin-top: 3px;text-align: left; display: flex; align-items: center;"><img style="width: 30px;" src="./assets/img/deal hot.jpg" alt=""><img style="width: 20px;" src="./assets/img/shipped.png" alt="">
                                <span style="margin-left: 10px;font-size: 12px;">Miễn phí đổi trả trong 7 ngày đầu tiên</span>
                            </div>
                        </span>
                    </span>
                        </td>
                        <td>${value.countryItem}</td>
                        <td style="font-size: 14px;">${value.size}</td>
                        <td>
                            <div style="display:flex; justify-content: center;">
                                <p><span style="font-size: 14px;color:#888888;text-decoration: line-through;" class="price-item">${value.priceOld}</span><sup style="color:#888888;">đ</sup></p>
                                <p><span style="font-size: 14px; margin-left:5px;" class="price-item">${value.price}</span><sup>đ</sup></p>
                            </div>
                        </td>
                        <td>
                            <div class="buy-amount" style="display: flex; justify-content: center;">
                                <span style="height: 30px; width: 30px;display: flex;justify-content: center;align-items: center; outline: none;border: 1px solid #ddd; cursor: pointer;" onclick="minus(${index})" class="ti-minus minus"></span>
                                <input style="width: 30px; height: 30px; text-align: center;border:none;    border: 1px solid #ddd; " type="text" value=${value.amount} min="1" onkeypress="input(${index})"  class="amount">
                                <span style="height: 30px; width: 30px;display: flex;justify-content: center;align-items: center; outline: none; border: 1px solid #ddd; cursor: pointer;" onclick="plus(${index})" class="ti-plus plus"></span>  
                            </div>
                        </td>
                        <td style="cursor: pointer;"><span style="font-size: 14px;" onclick="deleteCart(${index})" class="delete-cart">Xoá</span> </td>
                    </tr>`
    })
    tbody.innerHTML = content
    
    totalcart()
    
}

product()


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


function NullItem(){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []

    var nullProduct = document.querySelector(".null-product")
    if(listProduct.length ===0 ){
        nullProduct.style.display = 'block'
    }
    else{
        nullProduct.style.display = 'none'
    }
}

NullItem()

function deleteCart(index){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    listProduct.splice(index,1)
    localStorage.setItem("productList",JSON.stringify(listProduct))
    product()

    // valueShop = localStorage.getItem("ValueShop") ? JSON.parse(localStorage.getItem("ValueShop")) : []
    // valueShop.amountCart--
    // localStorage.setItem("ValueShop",JSON.stringify(valueShop))


    
    valueShop = localStorage.getItem("ValueShop") ? JSON.parse(localStorage.getItem("ValueShop")) : []
    valueShop.splice(index,1)
    localStorage.setItem("ValueShop",JSON.stringify(valueShop))
    ShopAmount()
    NullItem()

}


function totalcart(){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var sum = 0;
    listProduct.map((value,index)=>{
        var pri = value.price
        var amo = value.amount
        toltal = pri * amo
        sum+= toltal
        
    })
    var totalcartPrice = document.querySelector(".price-total-cart span")
    totalcartPrice.innerHTML = sum.toLocaleString("DE-de")
}

function plus(index){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var amount = listProduct[index].amount
    amount++
    listProduct[index].amount = amount
    localStorage.setItem("productList" , JSON.stringify(listProduct))
    product()
}

function minus(index){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var amount = listProduct[index].amount
    if(amount>1){
        amount--
        listProduct[index].amount = amount
        localStorage.setItem("productList" , JSON.stringify(listProduct))
        product()
    }
}
 

function input(index){
    var input = document.querySelectorAll(".amount")
    input.forEach(function(inp){
        inp.addEventListener("input",function(event){
            var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
            inputValue = inp.value
            inputValue = parseInt(inputValue)
            if(isNaN(inputValue) || inputValue===0){
                inputValue = 1
                inp.value = inputValue
            }
            listProduct[index].amount = inputValue
            console.log(listProduct[index].amount);
            localStorage.setItem("productList" , JSON.stringify(listProduct))
            product()
        })
    })

}


var goOrder = document.querySelector(".goOrder")
goOrder.addEventListener("click",()=>{
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    if(listProduct.length === 0){
        return
    }
    else{
        window.location = "#!/order"
    }
})




    








// function totalcart(){
//     var tbody = document.querySelectorAll(".cart-shop form tbody tr")  
//     var totalPrice = 0
//     for(var i = 0; i < tbody.length; i++){
//         var priceItem = tbody[i].querySelector(".price-item").innerHTML
//         var inputValue = tbody[i].querySelector(".amount").value
//         var price = priceItem * inputValue *1000
//         totalPrice += price 
//     }
//     var totalcartPrice = document.querySelector(".price-total-cart span")
//     totalcartPrice.innerHTML = totalPrice.toLocaleString("DE-de")
// }

// totalcart()

// var tbody = document.querySelectorAll(".cart-shop form tbody tr")
// for (let i = 0; i < tbody.length; i++) {
//     var a = tbody.length
//     var del = tbody[i].querySelector(".delete-cart")
//     var nullProduct = document.querySelector(".null-product")
//     del.addEventListener("click",function(){
//         a--
//         if(a==0){
//             nullProduct.style.display = 'block'
//         }
//         else{
//             nullProduct.style.display = 'none'
//         }
//     })
    
// }


// var plus = document.querySelectorAll(".plus") 
// plus.forEach(function(btn){
//     btn.addEventListener("click",function(event){
//         btn = event.target
//         btnplus = btn.parentElement
//         var amount = btnplus.querySelector(".amount")
//         valueAmount = amount.value
//         valueAmount++
//         amount.value = valueAmount
//         totalcart()
//     })
    
// })

// var minus = document.querySelectorAll(".minus") 
// minus.forEach(function(btn){
//     btn.addEventListener("click",function(event){
//         btn = event.target
//         btnminus = btn.parentElement
//         var amount = btnminus.querySelector(".amount")
//         valueAmount = amount.value
//         if(valueAmount>1){
//             valueAmount--
//             amount.value = valueAmount
//         }
//         totalcart()
//     })
// })


// var input = document.querySelectorAll(".amount")
// input.forEach(function(inp){
//     inp.addEventListener("input",function(event){
//         inputValue = inp.value
//         inputValue = parseInt(inputValue)
//         if(isNaN(inputValue) || inputValue===0){
//             inputValue = 1
//             inp.value = inputValue
//         }
//         totalcart()
//     })
// })




// function deletecart(){
//     var tbody = document.querySelectorAll(".cart-shop form tbody tr")  
//     for (let i = 0; i < tbody.length; i++) {
//         var del = tbody[i].querySelector(".delete-cart")
//         del.addEventListener("click",function(event){
//         var del1 = event.target
//         var del2 = del1.parentElement
//         var del3 = del2.parentElement
//         del3.remove()
//         totalcart()
//     }) 
//     totalcart()
// }
// }

// deletecart()






































// function EditAmount(){
//     var tbody = document.querySelectorAll(".cart-shop form tbody tr")  
//     for (let i = 0; i < tbody.length; i++) {
//         var plus = tbody[i].querySelector(".plus")
//         var minus = tbody[i].querySelector(".minus")
//         var amount = tbody[i].querySelector(".amount")
//         var valueAmount = amount.value
        
//         function updateAmount(valueAmount){
//             amount.value = valueAmount
//         }
        
//         plus.addEventListener("click",function(){
//             valueAmount++
//             updateAmount(valueAmount)
//             totalcart()
//         })
        
//         minus.addEventListener("click",function(){
//             if(valueAmount>1){
//                 valueAmount--
//                 updateAmount(valueAmount)
//                 totalcart()
    
//             }
//         })
        
//         amount.addEventListener("input",function(){
//             valueAmount = amount.value
//             valueAmount = parseInt(valueAmount)
//             if(isNaN(valueAmount) || valueAmount===0){
//                 valueAmount = 1
//                 updateAmount(valueAmount)
//             }
//             totalcart()
//         })
//     }


// }
// EditAmount()


// var btn = document.querySelectorAll("table tbody .check-item")
// btn.forEach(function(button){
    //     button.addEventListener("change",function(event){
        //         var but = event.target
//         var check = but.parentElement
//         var checkItem = check.parentElement
//         var productPrice = checkItem.querySelector(".price-item").innerHTML
//         var inputValue = checkItem.querySelector(".amount").value
//         var editamount = checkItem.querySelector(".buy-amount")
//         var deletebtn = checkItem.querySelector(".delete-cart")
//         if(button.checked){
//             EditAmount()
//             totalcart(productPrice,inputValue,true)
//             Delete()
//             function EditAmount(){
//                 var plus = editamount.querySelector(".plus")
//                 var minus = editamount.querySelector(".minus")
//                 var amount = editamount.querySelector(".amount")
//                 valueAmount = amount.value
//                 plus.addEventListener("click",function(){
//                     valueAmount++
//                     updateAmount(amount)
//                     totalcart(productPrice,inputValue,true)

//                 })
            
//                 minus.addEventListener("click",function(){
//                     if(valueAmount>1){
//                         valueAmount--
//                         updateAmount(amount)
//                         totalcart(productPrice,inputValue,false )
//                     }
//                 })
//             }

//             function Delete(){
//                 deletebtn.addEventListener("click",function(event){
//                     var btnrev = event.target
//                     var btndel = btnrev.parentElement
//                     var btndelete = btndel.parentElement
//                     btndelete.remove()
//                     totalcart(productPrice,inputValue,false)
//                 })
                
//             }
//         }else{
//             totalcart(productPrice,inputValue,false)
//         }
//     })
// })


// var pricetotal = 0
// function totalcart(productPrice,inputValue,isAdd){
//     var price = inputValue * productPrice * 1000
//     if(isAdd)
//     pricetotal += price
//     else
//     pricetotal -= price

//     var priceAll = document.querySelector(".totalPriceCart")
//     priceAll.innerHTML = pricetotal
// }

// function updateAmount(amount){
//     amount.value = valueAmount
// }



// EditAmount()
// function EditAmount(){
//     var buyAmount = document.querySelectorAll(".buy-amount")
//     for (let i = 0; i < buyAmount.length; i++) {
//         var plus = buyAmount[i].querySelector(".plus")
//         var minus = buyAmount[i].querySelector(".minus")
//         var amount = buyAmount[i].querySelector(".amount")
//         var valueAmount = amount.value
        
        
//         function updateAmount(amount){
//             amount.value = valueAmount
//         }
    
//         plus.addEventListener("click",function(){
//             valueAmount++
//             updateAmount(amount)
//         })
    
//         minus.addEventListener("click",function(){
//             if(valueAmount>1){
//                 valueAmount--
//                 updateAmount(amount)
//             }
//         })
    
//         amount.addEventListener("input",function(){
//             valueAmount = amount.value
//             valueAmount = parseInt(valueAmount)
//             if(isNaN(valueAmount) || valueAmount===0){
//                 valueAmount = 1
//             }
//             updateAmount(amount)
//         })
//     }

// }
