import { Application } from "https://deno.land/x/oak/mod.ts";
import { table } from "./table99.js";

const app = new Application();

app.use((ctx) => {
  // ctx.response.type = 'text/plain'
  // ctx.response.type = 'text/html'
  ctx.response.body = `
  <html>
    <head>
      <style>
        table{
          padding: 10px;
          text-align: center;
          background-color: rgba(187,212,61,0.2);
          border-collapse:collapse ;
          color: rgba(68, 67, 67, 0.8);
        }
        th{
            padding: 20px;
            background-color: rgba(244,240,165,0.5);
            color: #716746
        }
        tr:nth-child(even){
            background-color: rgba(170, 125, 65, 0.5);
        }
      </style>
    </head>
    <body style="margin: 0;">
      <div style="background-color: ivory; width: 435px;">
        <h1 style="text-align: center; border-bottom: 8px dotted #89B3A4">
          九九乘法表
        </h1>
      ${table()}  // return table_list 放入元素
      <div>
    </body>
  </html>`
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });

