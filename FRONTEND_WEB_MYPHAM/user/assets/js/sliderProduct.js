
// var imgP = document.querySelector(".product-item-img img")

// function updateActive(i){
//     var acti = document.querySelector('.img-slider .activeImg')
//     if(acti){
//         acti.classList.remove('activeImg')
//     }
//     var opaci = document.querySelector(".img-slider .opacity1")
//     if(opaci){
//         opaci.classList.remove('opacity1')
//         opaci.classList.add('opacity')

//     }
//     listImg[i].classList.add('activeImg')

//     listImg[i].classList.add('opacity1')
// }


// var listImg = document.querySelectorAll(".img-slider img")
// listImg.forEach(function(e,i){
//     e.addEventListener("click",function(){
//         imgP.style.opacity = '0'
//         setTimeout(function(){
//             index = i
//             var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
//             updateActive(i)
//             imgP.style.opacity = '1'
//         },300)
//     })    
//     e.classList.add('opacity')

// })


// index  = 0

// function Next(){
//     imgP.style.opacity = '0'
//     setTimeout(function(){
//         index++
//         if(index >= listImg.length){
//         index=0
//         }
//         var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
//         updateActive(index)
//         imgP.style.opacity = '1'
        
//     },100)
    
// }

// function Prev(){
//     imgP.style.opacity = '0'
//     setTimeout(function(){
//         index--
//         if(index<0){
//             index = listImg.length-1
//         }
//         var imgProduct = document.querySelector(".product-item-img img").src = listImg[index].src;
//         updateActive(index)
//         imgP.style.opacity = '1'
//     },100)
// }


// var icon = document.querySelector('.but')

// var Pleft = document.querySelector('.product-left')
// Pleft.addEventListener("mouseover",function(){
//     icon.style.display = 'block'
// })

// Pleft.addEventListener("mouseleave",function(){
//     icon.style.display = 'none'
// })

// setInterval(function(){
//     Next()
// },3000)
