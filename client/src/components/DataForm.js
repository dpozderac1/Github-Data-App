import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Row, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import { userIsLoggedIn } from '../store/actions/actions';
import { Navigate } from 'react-router';

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 24,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


function DataForm() {

    const [form] = Form.useForm();

    const loggedUser = useSelector((state) => state.loggedUser.loggedUser);
    const proxyUrl = useSelector((state) => state.loggedUser.proxyUrl);

    const [redirect, setRedirect] = useState(false);
    const isLogged = JSON.parse(localStorage.getItem("logged")) || false;

    const dispatch = useDispatch();

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, null, newUrl[0]);

            const requestData = {
                code: newUrl[1]
            };

            axiosInstance(proxyUrl).post("/authenticate", requestData).then((res) => {
                const storeData = {
                    logged: true,
                    loggedUser: {
                        login: res.data.login,
                        email: res.data.email,
                        followers: res.data.followers,
                        following: res.data.following,
                        avatarUrl: res.data.avatar_url
                    }
                }
                dispatch(userIsLoggedIn(storeData));
                form.setFieldsValue(res.data);
            })
                .catch((err) => {
                    setRedirect(true);
                    openErrorNotification();
                })
        }
        else {
            if (!isLogged) {
                setRedirect(true);
            }
            else {
                setRedirect(false);
            }
        }
    }, [loggedUser])

    const openErrorNotification = () => {
        notification['error']({
            message: 'Error',
            description:
                'There was an error while logging in. Try again.',
        });
    };

    const onFinish = (values) => {
        saveJSONFile(values, "datoteka");
    };

    const saveJSONFile = (json, filename) => {
        const fileData = JSON.stringify(json);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${filename}.json`;
        link.href = url;
        link.click();
    }

    //const isLogged = JSON.parse(localStorage.getItem("logged")) || false;

    return (
        <Row
            style={{ width: "100%" }}
            justify="space-around"
            align="middle"
        >
            {isLogged &&
                <Form {...layout} form={form} name="form" onFinish={onFinish} validateMessages={validateMessages} style={{ width: "50%" }}
                    initialValues={loggedUser}>
                    <Form.Item
                        name="login"
                        label="Username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {/*<Form.Item name={['user', 'location']} label="Location">
                    <Input />
                </Form.Item>*/}

                    <Form.Item
                        name="followers"
                        label="Followers"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                            },
                        ]}
                        style={{ textAlign: "left" }}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        name="following"
                        label="Following"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                            },
                        ]}
                        style={{ textAlign: "left" }}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol }} style={{ float: "right" }}>
                        <Button type="primary" htmlType="submit">
                            Save JSON
                        </Button>
                    </Form.Item>
                </Form>
            }
            {redirect ? <Navigate to="/" /> : ""}
        </Row>
    );
}

export default DataForm;