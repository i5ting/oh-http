http://www.embeddedjs.com/


## Post with x-www-form-urlencoded
see post.html


```
	<script>
	$(function(){
		$.ajaxSetup({
		  contentType: "application/x-www-form-urlencoded; charset=utf-8"
		});
	
		$.post("/users/post", { name: "i5a6", time: "2pm" },
		   function(data){
		     console.log(data);
		   }, "json");
		 
	});
	</script>
```

in routes/users.js

```
	router.post('/post', function(req, res) {
	  // res.send('respond with a resource');
		res.json(req.body);
	});
```

## Post with form-data


	npm install --save multer


Usage

```
var express = require('express')
var multer  = require('multer')

var app = express()
app.use(multer({ dest: './uploads/'}))
```

You can access the fields and files in the request object:

```
console.log(req.body)
console.log(req.files)
```

IMPORTANT: Multer will not process any form which is not multipart/form-data

[see more](https://github.com/expressjs/multer)



## Post with raw


To get the raw body content of a request with Content-Type: "text/plain" into req.rawBody you can do:

https://gist.github.com/tj/3750227


req.rawBody已经被干掉了，现在只能用req.text

下面是tj给出的代码片段

```
var express = require('./')
var app = express();
 
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});
 
app.post('/', function(req, res){
  res.send('got "' + req.text + '"');
});
 
app.listen(3000)
```


## node express upgrade

As part of the 3.x -> 4.x changes, the middleware for processing multipart/form-data request body data was removed from the bodyParser middleware, so it only parses application/x-www-form-urlencoded and application/json request body data.

If you want to use multipart/form-data as the request body, you need to use the multer middleware.