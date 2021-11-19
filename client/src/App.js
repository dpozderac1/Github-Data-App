import './App.css';
import Login from './components/Login';
import 'antd/dist/antd.css';
import './index.css';
import DataForm from './components/DataForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHeader from "./components/PageHeader";

import { Layout } from 'antd';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout
        style={{
          minHeight: "100vh",
        }}>
        <Header
          style={{
            minHeight: "80px",
          }}>
          <PageHeader />
        </Header>
        <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/data" element={<DataForm />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
