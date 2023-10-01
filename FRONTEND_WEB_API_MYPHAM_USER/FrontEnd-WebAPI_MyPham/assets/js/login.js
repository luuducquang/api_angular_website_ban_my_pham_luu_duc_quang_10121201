var eyeOpen = document.querySelector(".eye-open")
var eyeClose = document.querySelector(".eye-close")
var inputPass = document.querySelector(".input-pass")

eyeClose.addEventListener("click",function(){
    eyeClose.classList.add('hidden')
    eyeOpen.classList.remove('hidden')
    inputPass.setAttribute("type","text")
})

eyeOpen.addEventListener("click",function(){
    eyeOpen.classList.add('hidden')
    eyeClose.classList.remove('hidden')
    inputPass.setAttribute("type","password")

})

var warning = document.querySelector(".warning")
function checkinputuser(){
    var inputUser = document.querySelector(".input-user").value
    var check = /^[a-zA-Z]+[a-zA-Z0-9]+$/
    if(inputUser=="" || check.test(inputUser)===false){
        warning.style.display= 'block'
    }
    else{
        warning.style.display= 'none'
    }
}

function checkinputpass(){
    var warningPass = document.querySelector(".warning-pass")
    var inputPass = document.querySelector(".input-pass").value
    var check = /^[a-zA-Z0-9]+[a-zA-Z0-9@_]+$/
    if(inputPass=="" || check.test(inputPass)===false){
        warningPass.style.display= 'block'
    }
    else{
        warningPass.style.display= 'none'
    }
}

function login(){
    var inputUser = document.querySelector(".input-user").value
    var check = /^[a-zA-Z]+[a-zA-Z0-9]+$/
    var warningPass = document.querySelector(".warning-pass")
    var inputPass = document.querySelector(".input-pass").value
    var check = /^[a-zA-Z0-9]+[a-zA-Z0-9@_]+$/
    if(inputUser=="" || check.test(inputUser)===false ||inputPass=="" || check.test(inputPass)===false){
        warning.style.display= 'block'
        warningPass.style.display= 'block'
        return
    }
    
    else{
        window.location='./home.html'
        return
    }
}