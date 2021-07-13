import React, { Component, SyntheticEvent } from "react";
import { Route, Switch, withRouter, Redirect,RouteComponentProps} from "react-router-dom";
import PrivateRoute from './Routes/PrivateRoute';
import Login from './components/Login';


interface IProps extends RouteComponentProps {}
type IState = {
    email?: string;
    password?:string;
    message?:string;
}

class User extends Component<IProps,IState,RouteComponentProps> {
    constructor(props: IProps){
        super(props);
    }
    
    handleChange= (e:any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitLogin = (e:any) => {
        e.preventDefault();
        const {email,password} = this.state;
        const obj = {
            "email": email,
            "password": password
        }

       let resStatus = 0;
        fetch('http://localhost:3001/api/v0/authenticate',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        )
        .then(res => {
            resStatus = res.status
            return res.text()
        })
        .then(response => {
            if(resStatus === 404){
                this.setState({
                    message: 'El usuario ingresado no existe'
                })
            }else if(resStatus === 500){
                this.setState({
                    message:'Intente mas tarde'
                })
            }else if(resStatus === 200){
                localStorage.setItem('token',response);
                this.props.history.push('/page/profile');            
            }
        })
        .catch(msg => console.log('Error ' +  msg))
    }

    logout = () =>{
        localStorage.removeItem('token');
        this.props.history.push('/');
    }
    
    

    render(){
        return(
            <Switch>
                <PrivateRoute path="/page/profile" exact logout={this.logout} />
                <Route path="/page/login" exact>
                    <Login handlChange={this.handleChange} submitLogin={this.submitLogin} />
                </Route>
                <Route exact path="/">
                    <Redirect to="/page/profile" />
                </Route>
            </Switch>
        )
    }
}


export default withRouter(User);