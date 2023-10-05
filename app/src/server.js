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

app.get("/playground.html", (req, res) => {
        res.sendFile(__dirname + "/playground.html")
    }
);

app.get("/records.html", (req, res) => {
    res.sendFile(__dirname + "/records.html")
}
);

app.get("/css/playground.css", (req, res) => {
        res.sendFile(__dirname + "/css/playground.css");
    }
);

app.get("/css/records.css", (req, res) => {
    res.sendFile(__dirname + "/css/records.css");
}
);

app.get("/scripts/login.js", (req, res) => {
    res.sendFile(__dirname + "/scripts/login.js");
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

app.get("/scripts/figure.js", (req, res) => {
    res.sendFile(__dirname + "/scripts/figure.js");
    }
);

app.get("/scripts/next_figure.js", (req, res) => {
    res.sendFile(__dirname + "/scripts/next_figure.js");
    }
);

app.get("/scripts/controller.js", (req, res) => {
    res.sendFile(__dirname + "/scripts/controller.js");
    }
);

app.get("/scripts/figures.js", (req, res) => {
    res.sendFile(__dirname + "/scripts/figures.js");
    }
);

app.get("/scripts/records.js", (req, res) => {
    res.sendFile(__dirname + "/scripts/records.js");
    }
);

app.listen(5001, () => {});