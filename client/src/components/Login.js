import React from 'react';
import { Card, Row } from "antd";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { GithubOutlined } from "@ant-design/icons";

function Login() {

    const clientId = useSelector((state) => state.loggedUser.clientId);
    const redirectUri = useSelector((state) => state.loggedUser.redirectUri);

    const isLogged = JSON.parse(localStorage.getItem("logged")) || false;

    return (
        <Row
            justify="space-around"
            align="middle"
        >
            <Card
                title={
                    <h3>
                        Welcome to the app for collecting GitHub data!
                    </h3>
                }
                style={{ textAlign: "center", fontSize: "20px" }}
            >
                <div>
                    <a href={`https://github.com/login/oauth/authorize?&client_id=${clientId}&redirect_uri=${redirectUri}`} >
                        <h5 className="logInLink" style={{ color: "black" }}>
                            <GithubOutlined />&nbsp;
                            Log in with your GitHub account
                        </h5>
                    </a>
                </div>
            </Card >
            {isLogged ? <Navigate to="/data" /> : ""}
        </Row>
    );
}

export default Login;