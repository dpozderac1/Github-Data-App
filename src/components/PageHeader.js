import { Avatar, Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { userIsLoggedOut } from '../store/actions/actions';

function PageHeader() {

    const logged = useSelector((state) => state.loggedUser.logged);
    const avatarIcon = useSelector((state) => state.loggedUser.loggedUser ? state.loggedUser.loggedUser.avatarUrl : null);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userIsLoggedOut());
    }

    return (
        <Row style={{ display: "flex", alignItems: "center", lineHeight: "80px" }}>
            {console.log("LOKACIJA je: ", window.location.href)}
            <Col span="20" style={{ height: "80px" }}>
                <h1 style={{ color: "white", margin: "0px" }}>GitHub Data App</h1>
            </Col>
            {logged ?
                <Col span="2" style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                    <Button type="text" onClick={handleLogout} style={{ color: "white" }}>
                        Log out
                    </Button>
                </Col> : <Col span="2" />}
            <Col span="2" style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                {logged ?
                    <Avatar
                        style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                            float: "right",
                        }}
                        src={avatarIcon}
                    />
                    : <Avatar
                        style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                            float: "right",
                        }}
                        icon={<UserOutlined />}
                    />}
            </Col>

        </Row >
    )
}

export default PageHeader;