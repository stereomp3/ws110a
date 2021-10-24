const calendar_month = {January:'31', February:'28', March:'31',April:'30', May:'31', June:'30', July:'31', August:'31', September:'30', October:'31', November:'30', December:'31'}
const calendar_day = [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
var show_month = document.getElementById("show_month")
var show_year = document.getElementById("show_year")
let calendar_year = 2021
let count = 10
var password
function inc(){
    if(count < 11) show_month.innerHTML = Object.keys(calendar_month)[count += 1]
    else {
        calendar_year += 1
        show_year.innerHTML = calendar_year
        show_month.innerHTML = Object.keys(calendar_month)[count = 0]
    }
}
function dec(){
    if(count > 0)show_month.innerHTML = Object.keys(calendar_month)[count -= 1]
    else {
        calendar_year -= 1
        show_year.innerHTML = calendar_year
        show_month.innerHTML = Object.keys(calendar_month)[count = 11]
    }
}
function Calendar_day(){
    let calendar_list = []
    for (let day = 1; day <= Object.values(calendar_month)[count]; day ++){
        calendar_list.push(`<li><a href = /post/new${day} onclick = "show_schedule[2] = show_month.innerHTML;
        show_schedule[1] = show_month.innerHTML">${day}</a></li>`)
    }
    document.getElementById('days').innerHTML = calendar_list.join(" ")
}
function delete_button(){
    while(true){
        password = prompt('Please enter password to delete')
        if(password === 'certify1') return
        else alert("password error")
    }
}