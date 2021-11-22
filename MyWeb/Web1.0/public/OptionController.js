const sideNav = {}

sideNav.off = function () {
    document.getElementsByClassName("sideNav")[0].style.width = "0"
}

sideNav.on = function () {
    document.getElementsByClassName("sideNav")[0].style.width = "20%"
}


