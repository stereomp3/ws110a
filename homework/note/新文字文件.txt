```JS
default:
      r = await window.fetch('/list')  // json檔
      let posts = await r.json()  // r.json()是轉成json檔嗎?  //json.parse(obj) 在這邊用不了
      R.list(posts)
      break
```

