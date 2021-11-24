const sideNav = {}

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


