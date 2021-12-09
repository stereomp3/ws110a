const sideNav = {}
const button = {}

sideNav.off = function () {
    document.getElementsByClassName("sideNav")[0].style.width = "0"
}

sideNav.on = function () {
    document.getElementsByClassName("sideNav")[0].style.width = "20%"
}


sideNav.login = function(){
    document.getElementById("loginIcon").style.display = "none"
    document.getElementById("signoutIcon").style.display = ""
}

sideNav.logout = function(){
    document.getElementById("loginIcon").style.display = ""
    document.getElementById("signoutIcon").style.display = "none"
}


button.close = function(){
    var miniC = document.getElementsByClassName("minicanvas")[0]
    var parentObj = miniC.parentNode
    parentObj.removeChild(miniC)
}


