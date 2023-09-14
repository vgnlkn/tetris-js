let express = require('express');
let path = require('path')
let app = express();
const urlencodedParser = express.urlencoded({extended: false});

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html");
    }
);

app.get("/css/index.css", (req, res) => {
        res.sendFile(__dirname + "/css/index.css");
    }
);

app.post("/", urlencodedParser, function (req, res) {
        if(!req.body){ 
            return res.sendStatus(400);
        }
        console.log(req.body.Name);
        res.redirect('/playground')
    }
);

app.get("/playground", (req, res) => {
        res.sendFile(__dirname + "/playground.html");
    }
);

app.get("/css/playground.css", (req, res) => {
        res.sendFile(__dirname + "/css/playground.css");
    }
);

app.get("/scripts/field.js", (req, res) => {
    res.sendFile(__dirname + "/scripts/field.js");
    }
);

app.get("/scripts/index.js", (req, res) => {
    res.sendFile(__dirname + "/scripts/index.js");
    }
);

app.listen(5001, function () {
        console.log('Example app listening on port 3000!');
    }
);