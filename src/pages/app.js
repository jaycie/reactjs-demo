import React, { Component } from 'react'
import Auth from '../components/auth';
import '../css/base.css';
import '../css/login.css';

export class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      loggedIn: Auth.loggedIn()
    };
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  }

  componentWillMount() {
    Auth.onChange = this.updateAuth.bind(this);
    Auth.login();
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <a href="/logout">Log out</a>
            ) : (
              <a href="/login">Sign in</a>
            )}
          </li>
          <li><a href="/dashboard">Dashboard</a> (authenticated)</li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
}

export class Dashboard extends Component {
  render() {
    const token = Auth.getToken();
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
}

export class Login extends Component { 
  constructor(props) {
    super(props);
  
    this.state = {
      error: false,
      username: '',
      password: '',
      redirectUrl: ''
    };
  }

  componentDidMount() {
    
  }

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    Auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      // this.props.history.goBack(-1);
      // console.log(this.props);
      window.location.href="/"
      // const { location } = this.props;
      // if (location.state && location.state.nextPathname) {
      //   this.props.router.replace(location.state.nextPathname)
      // } else {
      //   this.props.router.replace('/')
      // }
    })
  }

  render() {
    return (
      <div className="login">
        <div className="header">
          <h1>用户登陆</h1>
        </div>
        
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="login-form mt-10">
            <div className="login-list-ctrl bb-1">
              <span>用户名</span> <input type="text" ref="email" onBlur={username=>this.setState({username: username})} name="username" placeholder="输入用户名" />
            </div>
            <div className="login-list-ctrl">
              <span>密码</span> <input type="password" ref="pass" name="password" placeholder="输入密码" onBlur={password=>this.setState({password: password})} />
            </div>
          </div>

          <div className="submit">
            <button type="submit" className="button">登陆</button>
          </div>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>

        <div className="other-link">
          <a href="/register/" className="ft-left">免费注册</a>
          <a href="/forgot-password/" className="ft-right">忘记密码</a>
        </div>
      </div>
    )
  }
}

export class Logout extends Component {
  componentDidMount() {
    Auth.logout();
    this.props.history.goBack(-1);
  }

  render() {
    return <p>You are now logged out</p>
  }
}

export function RequireAuth(nextState, replace) {
  if (!Auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
