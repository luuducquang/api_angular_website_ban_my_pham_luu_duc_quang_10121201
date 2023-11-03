var checkname = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
var checktel = /^[0-9]{10}$/
var checkcity = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
var checkprovince = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
var checkcommune = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u
var checkaddress = /^[\p{L}\p{Mn}\p{Pd}\p{Nd}\s]+$/u


// console.log(checkprovince.test('Qooo'));
function paynow(){
    var nameDelivery = document.querySelector(".name-delivery").value
    var warname = document.querySelector('.war-name')
    if(nameDelivery=="" || !checkname.test(nameDelivery)){
        warname.style.display = 'inline-block'
    }
    else{
        warname.style.display = 'none'
    }


    var telDelivery = document.querySelector(".tel-delivery").value
    var wartel = document.querySelector('.war-tel')
    if(telDelivery=="" || !checktel.test(telDelivery)){
        wartel.style.display = 'inline-block'
    }
    else{
        wartel.style.display = 'none'
    }


    // var provinceDelivery = document.querySelector(".province-delivery").value
    // var warprovince = document.querySelector('.war-province')
    // if(provinceDelivery=="" || !checkprovince.test(provinceDelivery)){
    //     warprovince.style.display = 'inline-block'
    // }
    // else{
    //     warprovince.style.display = 'none'
    // }

    // // var cityDelivery = document.querySelector(".city-delivery").value
    // var warcity = document.querySelector('.war-city')
    // if(cityDelivery=="" || !checkcity.test(cityDelivery)){
    //     warcity.style.display = 'inline-block'
    // }
    // else{
    //     warcity.style.display = 'none'
    // }

    // // var communeDelivery = document.querySelector(".input-commune").value
    // var warcommune = document.querySelector('.war-commune')
    // if(communeDelivery=="" || !checkcommune.test(communeDelivery)){
    //     warcommune.style.display = 'inline-block'
    // }
    // else{
    //     warcommune.style.display = 'none'
    // }

    var addresDelivery = document.querySelector(".input-address").value
    var waraddress = document.querySelector('.war-address')
    if(addresDelivery=="" || !checkaddress.test(addresDelivery)){
        waraddress.style.display = 'inline-block'
    }
    else{
        waraddress.style.display = 'none'
    }

    return false
}

var back = document.querySelector('.back')
back.addEventListener('click',function(){
    window.location = '#!/'
})

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

function product(){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    var tbody = document.querySelector(".order-cart-shop table tbody")
    var content = ``
    listProduct.map(function(value,index){
        content += `<tr>
                        <td style=" display: flex; align-items: center;"><img style="width: 20%;padding: 10px;" src="${value.img}" alt=""><a style="text-decoration: none; color:black;" href="#!/product/${value.id}" style="font-size: 14px;" class="nameItem">${value.name}</a></td>
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
                                <input style="width: 30px; height: 30px; text-align: center;    border: 1px solid #ddd; " type="text" value=${value.amount} min="1" onkeypress="input(${index})"  class="amount">
                                <span style="height: 30px; width: 30px;display: flex;justify-content: center;align-items: center; outline: none;border: 1px solid #ddd; cursor: pointer;" onclick="plus(${index})" class="ti-plus plus"></span>  
                            </div>
                        </td>
                        <td style="cursor: pointer;font-size: 14px;"><span onclick="deleteCart(${index})" class="delete-cart">Xoá</span> </td>
                    </tr>`
    })
    tbody.innerHTML = content
    totalcart()
    
}

product()


function deleteCart(index){
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
    listProduct.splice(index,1)
    localStorage.setItem("productList",JSON.stringify(listProduct))
    product()

    valueShop = localStorage.getItem("ValueShop") ? JSON.parse(localStorage.getItem("ValueShop")) : []
    valueShop.splice(index,1)
    localStorage.setItem("ValueShop",JSON.stringify(valueShop))
    ShopAmount()
    if(listProduct==0){
        window.location = './home.html'
    }


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
    var totalcartPrice = document.querySelector(".totalPriceCart")
    totalcartPrice.innerHTML = sum.toLocaleString("DE-de")
    var transportOrder = document.querySelector('.transport_oder').innerHTML
    var totalAll = document.querySelector(".total_all")
    totalAll.innerHTML = (parseInt(transportOrder)*1000+sum).toLocaleString('DE-de')
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


const host = "https://provinces.open-api.vn/api/";

function callAPI(api, callback) {
    fetch(api)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

callAPI(host,  function (data) {
    renderData(data, "province");
    printResult();
})

function renderData(array, select) {
    let row = ' <option selected disabled value="">Vui lòng chọn</option>';
    array.forEach(function (element) {
        row += `<option value="${element.code}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
}

document.querySelector("#province").addEventListener("change", function () {
    const provinceValue = this.value;
    callAPI(host + "p/" + provinceValue + "?depth=2", function (data) {
        renderData(data.districts, "district");
        printResult();
    });
});

document.querySelector("#district").addEventListener("change", function () {
    const districtValue = this.value;
    callAPI(host + "d/" + districtValue + "?depth=2", function (data) {
        renderData(data.wards, "ward");
        printResult();
    });
});

document.querySelector("#ward").addEventListener("change", function () {
    printResult();
});

function printResult() {
    const provinceText = document.querySelector("#province option:checked").textContent;
    const districtText = document.querySelector("#district option:checked").textContent;
    const wardText = document.querySelector("#ward option:checked").textContent;

    if (provinceText && districtText && wardText) {
        let result = provinceText + " | " + districtText + " | " + wardText;
        console.log(result);
    }
}


















// function totalcart(){
//     var tbody = document.querySelectorAll(".order-cart-shop form tbody tr")  
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

// var tbody = document.querySelectorAll(".order-cart-shop form tbody tr")
// for (let i = 0; i < tbody.length; i++) {
//     var a = tbody.length
//     var del = tbody[i].querySelector(".delete-cart")
//     var nullProduct = document.querySelector(".null-product")
//     del.addEventListener("click",function(){
//         a--
//         if(a==0){
//             window.location = './cart.html'
//             return
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
//     var tbody = document.querySelectorAll(".order-cart-shop form tbody tr")  
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
