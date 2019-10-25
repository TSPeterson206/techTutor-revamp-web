import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'reactjs-simple-spinner'
import request from '../utils/request'
import { FaShoePrints } from 'react-icons/fa'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrorMessage: false,
      isLoading: true,
      activeIndex: 0
    }

  }

  componentDidMount() {
    this.setState({
      isLoading: false
    })
  }

  handleLogin = event => {
    event.preventDefault()
    const {
      username,
      password
    } = event.target

    request('/auth/login', 'post', {
        username: username.value,
        password: password.value
      })
      .then(response => {
        this.setState({
          showErrorMessage: false
        })

        localStorage.setItem('token', response.data.token)
        return request('/auth/login')
      })
      .then(response => {
        this.props.setAuthentication(response.data)
        this.props.history.push({
          pathname: `/profile/${username.value}`,
          state: {
            username: username.value
          }
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          showErrorMessage: true
        })
        window.setTimeout(() => {
          this.setState({
            showErrorMessage: false
          });
        }, 2000);
      })
  }

render() {
    return (
      this.state.isLoading ? <div className="border rounded p-5 col-sm-6 mt-5 mr-auto ml-auto">
        <Spinner size="massive" lineSize={12} className="center" />
      </div>
        :
      <div>
        
        <div className="col-sm-6 mt-5 mr-auto ml-auto">
          <div className={this.state.showErrorMessage ? "error-handler alert alert-danger" : "error-handler alert alert-danger invisible"}>
            Invalid Username or Password
          </div>
          <div className="rounded clientlogin">
          <strong><div className="loginLogo"><FaShoePrints size="3em"/>NextSteps</div></strong>
          

            <form className="box border rounded p-5" onSubmit={this.handleLogin}>
              <h1>Client Login</h1>
              <div className="form-group">
                <input type="text" className="form-control" id="username" name="username" placeholder="enter username" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" name="password" placeholder="enter password" required />
              </div>
              <div className="submitandreset">
              <button type="submit" className="btn btn-outline-info" value="Login">Submit</button>
              <button type="reset" className="btn btn-outline-info">Start Over</button>
              </div>
              <div>
              <Link className="small" to="/signup">Create an Account</Link><br></br>
              <Link className="small" to="/providerSignup">Are you a provider? Add your business here!</Link>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    )
  }
}