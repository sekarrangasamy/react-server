var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3002;
var cors = require('cors')

var app = express();

var Personal = require('./personal.js');
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'public/index.html'));
});



// connection for Database
mongoose.connect('mongodb://sekar:Sekar123@ds045011.mlab.com:45011/sekarapp', {
	useNewUrlParser: true,
	useUnifiedTopology: true 
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log('Could not connect to the database. Exiting now...');
	process.exit();
});


app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/personal', (req,res)=>{
	Personal.find().then((data) => {
		res.send(data,200,"Get All Data");
	}).catch((err) => {
		res.send(err)
	})
})

app.post('/personal', (req, res) => {
	var getInfo = {};
		getInfo.name = req.body.name,
		getInfo.phone = req.body.phone,
		getInfo.email = req.body.email,
		getInfo.address = req.body.address
	Personal.create(getInfo).then((data) => {
		res.send(data,201,"Created");
	}).catch((err) => {
		res.send(err)
	})
});


app.put('/personal/:id', (req, res) => {
	var getInfo = {};
		getInfo.name = req.body.name,
		getInfo.phone = req.body.phone,
		getInfo.email = req.body.email,
		getInfo.address = req.body.address
	Personal.update({_id: req.params.id}, getInfo).then((data) => {
		res.send(data,200,"Updated");
	}).catch((err) => {
		res.send(err)
	})
});


app.get('/personal/:id', (req, res) => {
	Personal.findById(req.params.id).then((data) => {
		res.send(data,200,"Single Data");
	}).catch((err) => {
		res.send(err)
	})
});

app.delete('/personal/:id', (req, res) => {
	Personal.findByIdAndRemove(req.params.id).then((data) => {
		res.send(data,200,"Deleted");
	}).catch((err) => {
		res.send(err)
	})
});

app.listen(port, () => {
	console.log("Server is listening on port " + port);
});