const calendar_month = {January:'31', February:'28', March:'31',April:'30', May:'31', June:'30', July:'31', August:'31', September:'30', October:'31', November:'30', December:'31'}
const calendar_day = [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
function Calendar(){
    let calendar_list = [`
    <div class="month">  
        <ul>
            <li class="prev" onclick="dec()">&#10094;</li>
            <li class="next" onclick="inc()">&#10095;</li>
            <li>
                ${Object.keys(calendar_month)[0]}<br>
                <span style="font-size:18px">2021</span>
            </li>
        </ul>
    </div>`]
    calendar_list.push(`<ul class = "weekdays">`)
    for (let weekday = 0; weekday < calendar_day.length; weekday ++){
        calendar_list.push(`<li>${calendar_day[weekday]}</li>`)
    }
    calendar_list.push(`</ul> <ul class = "days">`)
    for (let day = 1; day <= Object.values(calendar_month)[0]; day ++){
        calendar_list.push(`<li>${day}</li>`)
    }
    calendar_list.push(`</ul>`)
    return calendar_list.join(" ")
}
console.log(Calendar())

