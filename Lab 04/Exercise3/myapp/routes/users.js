var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  var result = JSON.stringify(req.body);
  console.log('you posted:');
  console.log(result);
  res.send(result);
})

module.exports = router;
