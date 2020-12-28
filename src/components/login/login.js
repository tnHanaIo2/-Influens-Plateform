import React, { useEffect, useState } from 'react';
import {
    Form,
    Button,
    Grid, Segment
} from 'semantic-ui-react'
import { useHistory, withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";



import firebase from "../../firebase";
import userImg from "./profile.svg";

import { isLoggedIn } from '../../index'


const Login = ({ user }) => {

    const [errors, setErrors] = useState([])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn()) {
            history.push('/test/home')
        }
    }, [user, history])
    const handleChange = (event, method) => {
        method(event.target.value)
    };





    const displayErrors = (errors) =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);


    const handleInputError = (errors, inputName) => {
        return errors.some((error) =>
            error.message.toLowerCase().includes(inputName)
        )
            ? "error"
            : "";
    };

    const isFormValid = (email, password) => email && password;
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid(email, password)) {
            setErrors(errors => errors)
            setLoading(!loading)
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((signedInUser) => {
                    console.log('signedInUsersignedInUsersignedInUser', signedInUser)
                    if (signedInUser && signedInUser.user) {
                        window.M.toast({ html: `Welcome ${signedInUser.user.email.substr(0, 4)}`, classes: 'green' })

                        localStorage.setItem('token', user.ya)
                        history.push("/test/home")


                    } else {
                        window.M.toast({ html: 'Please check your email or Password', classes: 'orange' })
                        history.push("/test/login")
                        setLoading(false)
                        setEmail('')
                        setPassword('')

                    }


                })
                .catch((err) => {
                    console.error(err);
                    setErrors(errors.concat(err))
                    setLoading(false)

                });
        }
    };
    return (

        <Grid textAlign="center" verticalAlign="middle" >
            <Grid.Column style={{ maxWidth: 450, marginTop: '10%' }}  >
                <Form
                    onSubmit={handleSubmit}
                    size="large"

                >
                    <Segment stacked className='app'>
                        <img
                            src={userImg}
                            width="10%"
                            style={{ margin: "16px auto 38px", display: "block" }}
                            alt='user'
                            className="segment-img"
                        />

                        <div className="input">
                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email "
                                onChange={(e) => handleChange(e, setEmail)}
                                value={email}
                                className={handleInputError(errors, "email")}
                                type="email"
                            />

                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Mot de passe"
                                onChange={(e) => handleChange(e, setPassword)}
                                value={password}
                                className={handleInputError(errors, "password")}
                                type="password"
                            />
                            <div>
                                <Button
                                    disabled={loading}
                                    className={loading ? "loading login-btn" : "login-btn"}
                                    color="black"
                                    fluid
                                >
                                    Se connecter
</Button>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    padding: "30px 16px",
                                }}
                            >

                            </div>
                        </div>

                        {errors.length > 0 && (
                            <div error className="register">
                                <h3>Error</h3>
                                {displayErrors(errors)}
                            </div>
                        )}
                        <div className="register">
                            
                            Vous n'avez pas encore un compte?{" "}
                            <Link to="/test/register">
                                <b>Créer un compte</b>
                            </Link>
                        </div>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>



    );
}

export default withRouter(Login);
