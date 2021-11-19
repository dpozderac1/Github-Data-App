const express = require("express");
const path = require('path');
const FormData = require("form-data");
const axios = require('axios');

const app = express();

const client_id = "4b4a3783ee944a9e46c7";
const client_secret = "375cbef7f9906e4caa23e1ade5a75de3a630a4a7";
const redirect_uri = "https://dpozderac1.github.io/Github-Data-App/data";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/authenticate", (req, response) => {
    console.log("Usao u POST", req.body);
    const { code } = req.body;

    const data = new FormData();
    data.append("client_id", client_id);
    data.append("client_secret", client_secret);
    data.append("code", code);
    data.append("redirect_uri", redirect_uri);

    const params = {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
        //redirect_uri: redirect_uri
    }

    const headers = {
        'Accept': 'application/json'
    }

    // Request to exchange code for an access token
    axios.post(`https://github.com/login/oauth/access_token`, null, { params: params }, { headers: headers })
        .then((res) => {
            console.log("Usao u paramsString");
            let params = new URLSearchParams(res.data);
            const access_token = params.get("access_token");
            console.log("Access token je: ", access_token);

            // Request to return data of a user that has been authenticated
            axios.get(`https://api.github.com/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
                .then((res1) => {
                    return response.status(200).json(res1.data);
                });
        })
        /*.then((response) => response.json())
        .then((response) => {
            return res.status(200).json(response);
        })*/
        .catch((error) => {
            return response.status(400).json(error);
        });
});

app.get('/proba', (req, res) => {
    res.json({ "message": "Uspjesno!" });
    console.log(`Sent passwords`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));