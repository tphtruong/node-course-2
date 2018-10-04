import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            formErrors: {username: '', password: '', error:this.props.error},
            formValid: false,
        }

        this.handleUserLogin =  this.handleUserLogin.bind(this);
        this.onChangeUserName =  this.onChangeUserName.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    }

    handleUserLogin = (e) => {
        console.log('this.state.username',this.state.username);
        this.props.handleUserLogin(this.state.username, this.state.password);
    }
    onChangeUserName = (e) => {
        console.log('this.state.username',e.target.value);
        this.setState({username : e.target.value});
    }
    onChangeUserPassword = (e) => {
        console.log('this.state.password',e.target.value);
        this.setState({password : e.target.value});
    }
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }
    render() {
        console.log('eeror',this.props.user);
        
        return (
        <div className="App-header">
            <form className="LoginForm">
                <h2>Login</h2>
                <div className={`form-group
                    ${this.errorClass(this.state.formErrors.username)}`}>
                    <label htmlFor="username">Enter your UserName</label>
                    <br/>
                    <input
                        hintText="Enter your Username"
                        value={this.state.username}
                        onChange = {this.onChangeUserName}
                        />

                </div>

                <div className={`form-group
                    ${this.errorClass(this.state.formErrors.password)}`}>
                    <label htmlFor="username">Enter your Password</label>
                    <br/>
                    <input
                        type="password"
                        hintText="Enter your Password"
                        value={this.state.password}
                        onChange = {this.onChangeUserPassword}
                        />
                </div>

                <input type="button" 
                        className="btn btn-primary"
                        value="Submit" 
                        onClick={this.handleUserLogin}/>

                <div>{this.props.error !== undefined && `Error: ${this.props.error}`}</div>


            </form>
        </div>
        );
    }
}

export default connect(null,actions)(Login);