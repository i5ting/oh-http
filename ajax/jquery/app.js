var koa = require ('koa');
var serve = require ('koa-static');
var bodyParser = require ('koa-bodyparser');

var app = new koa();

app.use (bodyParser());
app.use (serve(__dirname + '/public'));
app.use ( ctx => {
    if(ctx.path === '/api/get_json_with_param'){
        console.log(ctx.query);
        var name = ctx.query.name;
        ctx.body = {
            "content":"ajax_info里的数据",
            "name": name
        }
    } else if (ctx.path === '/api/post_json_with_param') {
        console.log(ctx.request.body)
        var name = ctx.request.body.name
        ctx.body = {
            "content": "post_json_with_param里的数据",
            "name": name
        }
    } else {
        ctx.body = {
            "error":"请使用 /api/json 作为请求地址"
        }
    }
});

app.listen(3000);

console.log ("listening on port 3000");