export class CalendarModel{
    constructor(title, body, date, id){
        this.title = title;
        this.body = body;
        this.date = date;
        this.id = id;
    }   
}

export class LayoutModel{
    use(title, content){
        return `
        <html>
        <head>
            <title>${title}</title> 
            <link rel="stylesheet" href="layout.css">
            <link rel="stylesheet" href="../layout.css">
        </head>
        <body>
            <section id="content">
            ${content}
            </section>
        </body>
        </html>`
    }
}

