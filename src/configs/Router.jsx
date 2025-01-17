import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom'

import {
  inject,
  observer,
} from 'mobx-react'

import App from '../pages/Index'
import AdminLogin from '../pages/LoginRegister'
import BookDetail from '../pages/BookDetail'
import Admin from '../pages/Admin'
import AddRate from '../pages/AddRate'
import ManageReview from '../pages/ManageReview'
import AdminSearch from '../pages/AdminSearch'
import AdminUser from '../pages/AdminUser'
import AdminOrder from '../pages/AdminOrder'
import OrderDetail from '../pages/OrderDetail'


const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => (
        isLogin
          ? <Component {...props} />
          : (
            <Redirect
              to={{
                pathname: '/login',
                search: `?from=${props.match.url}`,
              }}
            />
          )
      )
    }
  />
)


const InjectPrivateRoute = withRouter(inject(({ store }) => {
  return {
    isLogin: store.appState.isLogin,
  }
})(observer(PrivateRoute)))

export default () => (
  <Switch>
    <Route path="/" exact component={App} key="index" />} />
    <Route path="/adminLogin" component={AdminLogin} key="adminLogin" />
    {/* <InjectPrivateRoute path="/recommend" exact component={Recommend} key="recommend" />} />
    <Route path="/list" exact component={Lists} key="index" />} />
    <InjectPrivateRoute path="/user" exact component={Home} key="user" />} />
    <Route path="/search" component={Search} key="search" />} /> */}
    <InjectPrivateRoute path="/adminUser" component={AdminUser} key="adminUser" />} />
    <InjectPrivateRoute path="/adminOrder" component={AdminOrder} key="adminOrder" />} />
    <InjectPrivateRoute path="/order/detail" component={OrderDetail} key="orderDetail" />} />
    <InjectPrivateRoute path="/book/:id" component={BookDetail} key="bookDetail" /> */
    {/* <InjectPrivateRoute path="/tag/:id" component={Tag} key="tag" />
    <InjectPrivateRoute path="/cart" component={MyCart} key="myCart" /> */}
    <InjectPrivateRoute path="/admin" component={Admin} key="admin" />
    <InjectPrivateRoute path="/addrate/:id" component={AddRate} key="addRate" />
    <InjectPrivateRoute path="/mreview/:id" component={ManageReview} key="manageReview" />
    <InjectPrivateRoute path="/msearch" component={AdminSearch} key="adminSearch" />

  </Switch>
)
