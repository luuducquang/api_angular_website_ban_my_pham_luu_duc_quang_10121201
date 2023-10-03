
var all = document.getElementById('frame')
var search = document.querySelector('.wrap')
var contentSearch = document.querySelector(".home-search")
all.addEventListener("click",function(){
    contentSearch.style.display = 'none'
})

search.addEventListener("click",function(){
    contentSearch.style.display = 'block'
})

search.addEventListener("click",function(event){
    event.stopPropagation()
})


var mockdata = [{
    picture : './assets/img/Cleanser/cerave-renewing-sa-face-cleanser-for-normal-skin.png',
    name : 'Sữa rửa mặt Cerave Renewing SA Face Cleaner 473ml',
    price : 399000,
    link :'./product.html',
},{
    picture : './assets/img/Sunscreen/martiderm spf50+.webp',
    name : 'Kem chống nắng Martiderm',
    price : 289000,
    link :'./product2.html',
},{
    picture : './assets/img/Makeup-remove/bioderma hong.jpg',
    name : 'Nước tẩy trang Bioderma hồng',
    price : 249000,
    link :'',
},{
    picture : './assets/img/Cleanser/laroche.png',
    name : 'Sữa rửa mặt LarochePosay cho da dầu',
    price : 309000,
    link :'',
},{
    picture : './assets/img/Lotion/centella skin1004.webp',
    name : 'Dưỡng ẩm Centella Skin1004',
    price : 349000,
    link :'',
},{
    picture : './assets/img/Sunscreen/martiderm spf50+.webp',
    name : 'Nước tẩy trang LarochePosay dành cho da dầu',
    price : 299000,
    link :'',
},{
    picture : './assets/img/Mask/bio-essence skin water full mask.webp',
    name : 'Mặt nạ Bio-Essence Skin Water Full Mask',
    price : 19000,
    link :'',
},{
    picture : './assets/img/Sunscreen/laroche spf50+.jpg',
    name : 'Kem chống nắng LarochePosay Spf50+',
    price : 299000,
    link :'',
},{
    picture : './assets/img/Spray/laroche.jpg',
    name : 'Xịt khoáng cấp ẩm LarochePosay',
    price : 229000,
    link :'',
},{
    picture : './assets/img/Tonner/klairs.jpg',
    name : 'Toner cấp ẩm Klairs',
    price : 209000,
    link :'',
},{
    picture : './assets/img/Makeup-remove/biodema.jpg',
    name : 'Nước tẩy trang Bioderma Xanh',
    price : 209000,
    link :'',
}]


var products = document.querySelector(".content-search")
mockdata.forEach(item=>{
    var newProducts = document.createElement('div')
    newProducts.classList.add('products-search')
    newProducts.innerHTML ='<img src="'+item.picture+'" alt=""> <div class="info"> <div class="name-search">'+item.name+'</div> <div class="price-search"> <span>'+item.price.toLocaleString('DE-de')+'</span><sup>đ</sup> </div> <span style="display:none;" class="link">'+item.link+'</span> </div>'
    products.append(newProducts)
})


var searchInput = document.querySelector(".search input")
searchInput.addEventListener("input",(e)=>{
    let txtSearch = e.target.value.trim().toLowerCase()
    var listProductDOM = document.querySelectorAll(".products-search")
    listProductDOM.forEach(item=>{
        if(item.innerText.toLowerCase().includes(txtSearch)){
            item.classList.remove('hide')
        }
        else{
            item.classList.add('hide')
        }
    })
})


var click = document.querySelectorAll(".products-search")
click.forEach(event=>{
    event.addEventListener("click",()=>{
        var link = event.querySelector(".link")
        var location = link.innerHTML
        window.location = location
    })
})



