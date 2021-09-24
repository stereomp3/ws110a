function table(){
    document.write('<table>')
    for(let i = 1; i < 10; i++){
        for(let j = 1; j < 10; j++){
            if(j==i){document.write(
                `<td style="background-color: #716746; color: white">${i*j}</td>`)} 
            else if(i == 1){document.write(`<th>${i*j}</th>`)}
            else if(j == 1){document.write(`<tr><th>${i*j}</th>`)}
            else{document.write(`<td>${i*j}</td>`)}
        }
    }
}