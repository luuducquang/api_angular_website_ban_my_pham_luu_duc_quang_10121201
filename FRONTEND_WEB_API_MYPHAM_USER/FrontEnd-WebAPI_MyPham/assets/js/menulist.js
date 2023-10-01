var body = document.querySelector("body")
var btnList = document.querySelector(".list")
var menuleft = document.querySelector(".menu-left")
var OptionMenu = menu.style.display = 'none'
btnList.addEventListener("click",function(){
    if(OptionMenu == 'none'){
        menuleft.style.animation = ''
        setTimeout(function(){
            menuleft.style.animation = 'upslide .3s linear'
            OptionMenu = menu.style.display = 'block'
        },100)
    }
    else{
        OptionMenu = menu.style.display = 'none'
    }
})

body.addEventListener("click",function(){
    OptionMenu = menu.style.display = 'none'
})

menuleft.addEventListener("click",function(event){
    event.stopPropagation()
})

btnList.addEventListener("click",function(event){
    event.stopPropagation()
})