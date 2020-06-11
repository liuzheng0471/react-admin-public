import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Layout, Avatar, Button, Tooltip, Dropdown, Menu, Input, Breadcrumb } from 'antd'

import { observer } from 'mobx-react'
//import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Loading from '../../components/loading'
import './index.styl'
import Container from '../../utils/Container'
import appState from '../../stores/appState'
import logo from '../../asserts/logo.png'
import { getTab } from '../../utils/utils'
import {
	AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  } from '@ant-design/icons';

const style = {
  width: '100%',
  maxWidth: 1200,
  marginRight:'auto',
  marginLeft: 'auto',
  paddingLeft: 20,
  paddingRight: 20
}

// const { Header, Content, Footer } = Layout
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const AppLayout = observer(({ children, history }) => {
	const { isLogin } = appState

	const { query: { query = '' } = {} } = history
	
	const [tabKey, setTabValue] = useState(getTab(history.location.pathname))
	const [search, setSearch] = useState(query)

	useEffect(() => {
		setTabValue(getTab(history.location.pathname))
	}, [history.location.pathname]);


	const UserDropDown = (
		<Menu>
			{/* <Menu.Item>
				<Link to="/admin">个人主页</Link>
			</Menu.Item>
			<Menu.Item>
				<Link to="/admin">账号管理</Link>
			</Menu.Item> */}
			<Menu.Item>
				<Button onClick={appState.logout} type="link">
					注销
				</Button>
			</Menu.Item>
		</Menu>
	)

	return (
		// <Layout>
		// 	<Header className="site-header">
		// 		<Container style={style}>
		// 			<div className="header-inner">
		// 				<div className="header-left">
		// 					<div className="logo">
		// 						<Link to="/">
		// 							<img src={logo} alt="logo" className="logo-img" />
		// 						</Link>
		// 					</div>
		// 					<Menu
		// 						mode="horizontal"
		// 						defaultSelectedKeys={[tabKey]}
		// 						style={{ lineHeight: '62px', marginRight: '10px' }}
		// 						theme="dark"
		// 						mode="inline"
		// 					>
		// 						<Menu.Item key="1">
		// 							<Link to="/">首页</Link>
		// 						</Menu.Item>
		// 						<Menu.Item key="2">
		// 							<Link to="/recommend">小葵花猜</Link>
		// 						</Menu.Item>
		// 						<Menu.Item key="3">
		// 							<Link to="/list">年度榜单</Link>
		// 						</Menu.Item>
		// 						<Menu.Item key="4">
		// 							<Link to="/shop">小葵花书店</Link>
		// 						</Menu.Item>
		// 					</Menu>
		// 					<div>
		// 						<Input.Search
		// 							onChange={handleSearchChange}
		// 							onSearch={handleOnSearch}
		// 							value={search}
		// 							placeholder="书名、作者、ISBN"
		// 						/>
		// 					</div>
		// 				</div>
		// 				<div className="header-right">
		// 					{isLogin ? (
		// 						<Dropdown overlay={UserDropDown}>
		// 							<Avatar size={40} />
		// 						</Dropdown>
		// 					) : (
		// 						<Tooltip placement="bottom" title="点击登录">
		// 							<Link to="/login">
		// 								<Avatar size={40} icon={<UserOutlined />} />
		// 							</Link>
		// 						</Tooltip>
		// 					)}
		// 				</div>
		// 			</div>
		// 		</Container>
		// 	</Header>

		// 	<Content style={{ ...style, minHeight: '700px' }}>
		// 		<Container>{children}</Container>
		// 	</Content>
		// 	<Footer className="footer">小葵花二班 Copyright © 2020-present</Footer>
		// </Layout>
		<Layout>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
	  <div className="logo">
			<Link to="/">
		 		<img src={logo} alt="logo" className="logo-img" />
		 	</Link>
		</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="4" icon={<BarChartOutlined />}>
			<Link to="/">系统概况</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<AppstoreOutlined />}>
          <Link to="/admin">图书管理</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<TeamOutlined />}>
		<Link to="/adminUser">用户管理</Link>
        </Menu.Item>
		<Menu.Item key="8" icon={<ShopOutlined />}>
		<Link to="/adminOrder">订单管理</Link>
        </Menu.Item>
      </Menu>

	  <div className="sider-left">
		{isLogin ? (
			<Dropdown overlay={UserDropDown}>
				<Avatar size={40} />
			</Dropdown>
		) : (
			<Tooltip placement="bottom" title="点击登录">
				<Link to="/adminLogin" icon={<UserOutlined />}>
					<Avatar size={27} icon={<UserOutlined />}  style={{color: '#041527',backgroundColor: '#cccccc',}}/> 
				</Link>
			</Tooltip>
		)}
	</div>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
	  	<Content style={{ ...style, minHeight: '700px' }}>
		 		<Container>{children}</Container>
		 	</Content>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
	)
})

export default withRouter(AppLayout)
