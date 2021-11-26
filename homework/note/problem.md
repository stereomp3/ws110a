```JS
default:
      r = await window.fetch('/list')  // json檔
      let posts = await r.json()  // r.json()是轉成json檔嗎?  // json.parse(obj) 在這邊用不了
      R.list(posts)
      break
```



> object --> json，  str --> json



> fetch裡面的show是如何被觸發的??    .get('/post/:id', show)  在前端router觸發



> fetch可以get到後端的資料嗎? ( 像是取得資料庫內容 ... ) 可以用資料丟到網路上去取得資料
>
> status = 400可以讓他錯誤，status成功是200
