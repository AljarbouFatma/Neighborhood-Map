import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'

import Header from './header/header'
import Footer from './footer/footer'

import Home from './home/home'
import AuthContainer from './auth/authContainer'
import ServeContainer from './auth/serveContainer'

import ArticlesContainer from './articles/articlesContainer'
import ArticleDetails from './articles/details/articleDetails'

import Login from './auth/login'
import Register from './auth/register'

class App extends Component {
  render() {
    return (
			<div>
				<Route key="header" component={Header}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route render={()=>
            <AuthContainer key="authcontainer">
              <ServeContainer>
                <Switch >
                  <Route exact path="/articles/new" component={ArticlesContainer} />
                  <Route exact path="/articles/:id" component={ArticleDetails} />
                  <Route path="/articles" component={ArticlesContainer} />
                  <Route render={()=><div><b>404</b></div>} />
                </Switch>
              </ServeContainer>
            </AuthContainer>
          }>
          </Route>
        </Switch>
        <Route component={Footer} />

      </div>
    );
  }
}

export default App;
