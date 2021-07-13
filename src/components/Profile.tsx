import React, { Component, useEffect, useState } from "react";
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    IconButton,
    Button
} from "@material-ui/core";
import Styles from "../style/Styles-type";
import { withRouter, RouteComponentProps } from 'react-router-dom';

type IState = {
    _id?: string;
    id?: string;
    avatar?: string;
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
    age?: number;
    role?: string;
}


interface IProps {
    classes?: any,
    logout?: () => void;
}
class Profile extends React.Component<IProps, IState, RouteComponentProps> {
    constructor(props: IProps) {
        super(props);
        this.getProfile = this.getProfile.bind(this)
    }

    async getProfile() {
        const token = localStorage.getItem('token') || ''
        const res = await fetch('http://localhost:3001/api/v0/users/me',
            {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
        const json = await res.json()
        this.setState(json)
    }

    componentDidMount() {
        this.getProfile()
    }
    render() {
        const { classes, logout } = this.props;
        return (
            <div>
                <h1>My Profile</h1>
                {this.state &&
                    <Card className={classes.card} elevation={1}>
                        <CardContent>
                            <img src={this.state.avatar} width="100" height="100" />
                            <Typography variant="h3" className={classes.name}>
                                {this.state.name}
                            </Typography>
                            <Typography variant="h4" className={classes.body}>
                                {this.state.surname}
                            </Typography>
                            <Typography variant="h4" className={classes.body}>
                                {this.state.age} years
                            </Typography>
                            <Typography variant="h4" className={classes.body}>
                                {this.state.email}
                            </Typography>
                            <Typography variant="h4" className={classes.body}>
                                {this.state.role}
                            </Typography>
                            <Button
                                type="button"
                                variant="outlined"
                                className={classes.button}
                                fullWidth
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </CardContent>
                    </Card>
                }
            </div>
        )
    }
}


export default withStyles(Styles)(Profile);


