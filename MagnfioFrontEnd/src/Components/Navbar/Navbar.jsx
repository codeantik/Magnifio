import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  CalendarOutlined,
  SearchOutlined,
  InboxOutlined
} from '@ant-design/icons';
// import './navbar.css';
import './navbarDark.css';
import 'antd/dist/antd.css';
import SearchBar from 'material-ui-search-bar';
import { message, Calendar } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import Search from '../Search/Search';
import Dasboard from '../Dashboard/Dashboard'
import Upload from '../Files/Files';
import CalendarPage from '../Calendar/Calendar'
import Todo from '../Todo/Todo';
import Analytics from '../Analytics/Analytics';
import Chat from '../Chat/Chat';
import History from '../History/History';
import Welcome from '../Welcome/Welcome';
import TempAnalytics from '../TempAnalytics/TempAnalytics';
import TempDashboard from '../TempDashboard/TempDashboard';
import ChatBoxes from '../ChatBoxes/Chat';
import MainChat from '../Chat/MainChat/MainChat';

// images
import sidebarLogo from '../../images/sidebar-logo.png';
import headLogo from '../../images/head-logo.png';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function Navbar() {
  const [collapse, setCollapse] = useState(false);
  const history = useHistory()

  const onCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    if(!sessionStorage.getItem('accessToken')) {
      history.push('/login')
    }
  }, [])

  function signOut() {
    sessionStorage.clear()
    history.push('/login')
  }


  return (
    <div className="nav">
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider 
            // collapsible 
            width={150}
            className="sider"
            // collapsed={collapse} 
            // onCollapse={onCollapse}
            // style={{ background: '#eee' }}
          >
            <div className="logoo">
              <Link to="/search">
                <img
                  src={sidebarLogo}
                  alt="logo"
                  className="logo"
                />
              </Link>
            </div>
            <Menu 
              theme="dark" 
              mode="inline"
              className='main-menu'
              // style={{ background: '#eee', fontWeight: 'bolder'}} 
            >
              <Menu.Item key="0" className="menu">
                <Link to="/dasboard" className="link">
                  <PieChartOutlined className="icon-link" />
                  <p>Dashboard</p>
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="1" className="menu">
                <Link to="/search" className="link">
                  <SearchOutlined className="icon-link" />
                  <p>Search</p> 
                </Link>
              </Menu.Item> */}
              <Menu.Item key="3" className="menu">
                <Link to="/chat" className="link">
                  <MessageOutlined className="icon-link" /> 
                  <p>Chat</p> 
                </Link>
              </Menu.Item>
              {/* <SubMenu key="sub2" icon={<TeamOutlined className="icon-link" />} title="Team">
                <Menu.Item key="4" className="link" style={{ background: '#dadae0', border: '#dadae0' }}>
                  <Link to="/todo" className="link" >Todo</Link>
                </Menu.Item>
              </SubMenu> */}
              <Menu.Item key="9" className="menu">
                <Link to="/calendar" className="link" >
                  <CalendarOutlined className="icon-link" />
                  <p>Calendar</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="10" className="menu">
                <Link to="/upload" className="link" >
                  <FileOutlined className="icon-link" />
                  <p>Files</p>
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="11" className="menu">
                <Link to="/analytics" className="link" >
                  <DesktopOutlined className="icon-link" />
                  <p>Analytics</p>
                </Link>
              </Menu.Item> */}
              <Menu.Item key="12" className="menu">
                <Link to="/temp" className="link" >
                  <InboxOutlined className="icon-link" />
                  <p>Analytics</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="13" className="menu">
                <Link to="/chatboxes" className="link">
                  <MessageOutlined className="icon-link" />
                  <p>Chatboxes</p>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background">
              <div className="logo-heading">
                {/* <h1>Magnif.io</h1> */}
                <img src={headLogo} alt="head-logo" className="head-logo" />
              </div>
              <div className="icons">
                <Link to="/search">
                  <SearchOutlined className="search-bar" title="Search"/>
                </Link>
                <UserOutlined className="sign-out" onClick={signOut} title="SignOut"/>
                {/* Dark mode button */}
              </div>
            </Header>
            <Content className="content">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/dasboard" component={TempDashboard} />
              <Route exact path="/upload" component={History} />
              <Route exact path="/calendar" component={CalendarPage} />
              <Route exact path="/todo" component={Todo}/>
              <Route exact path="/analytics" component={Analytics}/>
              <Route exact path="/chat" component={MainChat}/>
              <Route exact path="/temp" component={TempAnalytics}/>
              <Route exact path="/chatboxes" component={ChatBoxes}/>
              {/* <Route exact path="/history" component={History}/> */}
              {/* <Welcome /> */}
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}
