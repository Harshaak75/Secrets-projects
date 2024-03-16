//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));
var user_password = "";

var user_authentication = false;

app.use(bodyParser.urlencoded({ extended: true }));

function takingThePassword(req, res, next) {
    user_password = req.body["password"];
    if (user_password == "ILoveProgramming") {
        user_authentication = true;
    }
    next();
}

app.use(takingThePassword);

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/public/index.html");
})

app.post("/check", (req, res) => {
    if (user_authentication) {
        res.sendFile(_dirname + "/public/secret.html");
    }
    else {
        res.sendFile(_dirname + "/public/index.html");
    }
})


app.listen(port, () => {
    console.log("The server is running");
})

