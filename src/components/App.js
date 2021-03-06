import React, {Component} from 'react';
import '../styling/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import request from '../utils/request'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import ProviderSignup from './ProviderSignup'
import Profile from './Profile'
import EditProfile from './EditProfile'

export default class App extends Component{
  constructor(){
    super()

    this.state = {
      authentication: {
        pending: true,
        user: null,
        search: false
      }
    }
  }


  setAuthentication = claim => {
    this.setState({
      authentication: {
        pending: false,
        user: claim
      }
    })
  }

  componentDidMount() {
    request('/auth/login')
      .then(response => this.setAuthentication(response.data))
      .catch(err => {
        console.log(err);
        this.setAuthentication(null)
      })
    }

  render (){
  return (
    <div className="App">
     <BrowserRouter>
              <div>
                {/* <Header setAuthentication={this.setAuthentication} user={this.state.authentication.user}/> */}
                  <Switch>
                    {/* <Route path="/profile/:username" render={(props) => <Profile {...props} authentication={this.state.authentication} user={this.state.authentication.user} />}  /> */}
                    {/* <Route path="/edit/:username" render={(props) => <EditProfile {...props} authentication={this.state.authentication} user={this.state.authentication.user} />} />
                    <Route path="/signup" render={(props) => <Signup {...props} setAuthentication={this.setAuthentication}/>} />
                    <Route path="/providerSignup" render={(props) => <ProviderSignup {...props} setAuthentication={this.setAuthentication}/>} />
                    <Route path="/" render={(props) => <Login {...props} setAuthentication={this.setAuthentication}/>} /> */}
                    <Route path="/profile" render={(props) => <Profile {...props} setAuthentication={this.setAuthentication}/>} />
                  </Switch>
              </div>
          </BrowserRouter>
          {/* <Footer className="footer text-center mt-5" bgColor={'lightblue'} height={75}text={<FaShoePrints size="3em"/>}></Footer> */}
    </div>
  );
}
}


