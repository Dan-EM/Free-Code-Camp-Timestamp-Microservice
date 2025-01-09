// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", (req, res) => {
  
  //initialize dateInput
  let dateInput = new Date (req.params.date);
  
  //if inValid, set date
  if(isInvalid(dateInput)){
    dateInput = new Date(+req.params.date);
  }
  //If it is STILL Invalid
  if(isInvalid(dateInput)){
    res.json({error:"Invalid Date"});
    return;
  }
  //response will be based on input "date"
  res.json({
    unix: dateInput.getTime(),
    utc: dateInput.toUTCString()
  });
});

app.get("/api", (req,res) => {
  res.json({
    //if empty, response will be based on current time
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  })
})

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

