> str to list    -->  use split

```JS
str = "123/4567/89"
list = str.split('/')
console.log(list[0]) // 123
console.log(list[1]) // 4567
console.log(list[2]) // 89
```



> list to str    -->  use join

```JS
list = [1,2,3,4,5]
str = list.join("*")
console.log(str)  // 1*2*3*4*5
```



> list加入

```
list.push()
```





> json to str

```JS
JSON.stringify({title: title, body: body}
```



> obj to json

```JS
json.parse(obj)
```



> appendChild

```
// 創建一個段落元素 <p>，然后添加到 <body> 的最尾部
var p = document.createElement("p");
document.body.appendChild(p);
```





> go to top

```
document.body.scrollTop = 0
```











