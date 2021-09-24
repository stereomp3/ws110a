// 產生99乘法表元素
export function table(){ // export宣告這函數可以被引入
    let table_list = ['<table>']
    for(let i = 1; i < 10; i++){
        for(let j = 1; j < 10; j++){
            if(j==i){table_list.push(
                `<td style="background-color: #716746; color: white">${i*j}</td>`)} 
            else if(i == 1){table_list.push(`<th>${i*j}</th>`)}
            else if(j == 1){table_list.push(`<tr><th>${i*j}</th>`)}
            else{table_list.push(`<td>${i*j}</td>`)}
        }
    }
    return table_list.join(" ")
}
console.log(table())

