
var express = require('express'),
    path = require('path');
var Firebase = require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator('key');
var token = tokenGenerator.createToken({admin: true});
var dataRef = new Firebase("https://tufirebase.firebaseio.com/");

var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 7000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.favicon(__dirname + '/public/favicon.ico')); 
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/subir', function(req, res){

})

app.get('/', function(req, res){
  dataRef.auth(token, function(error) {
    if(error) {
      console.log("Login Failed!", error);
    } else {
      var childRef = dataRef.child('users');
      //childRef.set(JSON.parse(req.param('somedata')));
      console.log("Login Succeeded!");
      console.log(req.param('somedata'));
    }
  });
  res.render('index', {
    title: "EJS example",
    header: "Some users"
  });
});

app.get('/logget', function(req, res){
  dataRef.auth(token, function(error) {
    if(error) {
      console.log("Login Failed!", error);
    } else {
      var childRef = dataRef.child('users');
      childRef.set(req.param('somedata'));
      console.log(req.param('somedata'));
    }
  });
  res.header('Content-Type', 'application/json');
  res.header('Charset', 'utf-8')  
  res.send(req.query.callback + '({"something": "rather", "more": "pork", "tua": "tara"});');  
});

app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
})


app.listen(7000);
console.log('Listening on port 7000');

