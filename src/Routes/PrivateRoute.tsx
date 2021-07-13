import  React, { FC } from  "react";
import { Route, Redirect } from  "react-router-dom";
import Profile  from './../components/Profile';

const  PrivateRoute: React.FC<{
        path: string;
        exact: boolean;
        email?:string;
        password?:string;
        logout?:() => void;
    }> = (props) => {
    const condition = performValidation();

    return  condition ? (<Route  path={props.path}  exact={props.exact}><Profile logout={props.logout}/> </Route>) : 
        (<Redirect  to="/page/login"  />);
};

const performValidation = () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if(token){
        return true;
    }else{
        return false;
    }
}

export  default  PrivateRoute;