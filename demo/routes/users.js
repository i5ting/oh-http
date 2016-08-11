var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res) {
  res.send('respond with a resource' + request.params.id);
});

// http://127.0.0.1:3001/users/post
router.post('/post', function(req, res) {
  // res.send('respond with a resource');
    res.json(req.body);
});

router.post('/post/formdata', function(req, res) {
  // res.send('respond with a resource');
	console.log(req.body, req.files);
	console.log(req.files.pic.path);
	res.json(req.body);
});

router.post('/post/raw', function(req, res) {
  // res.send('respond with a resource');
  console.log(JSON.parse(req));
  console.log(JSON.parse(req.text));
	res.json(JSON.parse(req.text));
});


module.exports = router;
