import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
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
    render() {
        return (
        <div>
            <div>
            <h2>
                Login
            </h2>
            <input
                hintText="Enter your Username"
                floatingLabelText="Username"
                value={this.state.username}
                onChange = {this.onChangeUserName}
                />
            <br/>
                <input
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                value={this.state.password}
                onChange = {this.onChangeUserPassword}
                />
                <br/>
                <input type="button" value="Submit" primary={true} style={style} 
                    onClick={this.handleUserLogin}/>
            </div>
        </div>
        );
    }
}
const style = {
 margin: 15,
};
export default connect(null,actions)(Login);