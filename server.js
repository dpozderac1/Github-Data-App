const express = require("express");
const path = require('path');
const FormData = require("form-data");
const axios = require('axios');

const app = express();

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/authenticate", (req, response) => {
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
    }

    const headers = {
        'Accept': 'application/json'
    }

    axios.post(`https://github.com/login/oauth/access_token`, null, { params: params }, { headers: headers })
        .then((res) => {
            let params = new URLSearchParams(res.data);
            const access_token = params.get("access_token");

            axios.get(`https://api.github.com/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
                .then((res1) => {
                    return response.status(200).json(res1.data);
                });
        })
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