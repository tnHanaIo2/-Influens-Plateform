import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import md5 from "md5";
import {
    Grid,
    Form,
    Segment,
    Button,

} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

import userImg from ".//profile.svg";

import { isLoggedIn } from '../../index'

const Register = () => {


    const [username, setUserName] = useState([])
    const [errors, setErrors] = useState([])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordConfirmation, setConfirmation] = useState(false);
    const [usersRef,] = useState(firebase.database().ref("users"));

    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn()) {
            history.push('/test/home')
        }
    }, [history])



    const isFormValid = () => {
        let errors = [];
        let error;

        if (isFormEmpty(username, email, password, passwordConfirmation)) {
            error = { message: "Fill in all fields" };
            setErrors(errors.concat(error))
            return false;
        } else if (!isPasswordValid(password, passwordConfirmation)) {
            error = { message: "Password is invalid" };
            setErrors(errors.concat(error))
            return false;
        } else {
            return true;
        }
    };

    const isFormEmpty = (username, email, password, passwordConfirmation) => {
        return (
            !username.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
    };

    const isPasswordValid = (password, passwordConfirmation) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    };

    const displayErrors = errors =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);

    const handleChange = (event, method) => {
        method(event.target.value)
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (isFormValid()) {
            setErrors([])
            setLoading(loading)
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(createdUser => {
                    createdUser.user.sendEmailVerification()
                    console.log('createdUser', createdUser);
                    createdUser.user
                        .updateProfile({
                            displayName: username,
                            photoURL: `http://gravatar.com/avatar/${md5(
                                createdUser.user.email
                            )}?d=identicon`
                        })
                        .then(() => {
                            saveUser(createdUser).then(() => {
                                console.log("user saved");
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            setErrors(errors.concat(err))
                            setLoading(!loading)
                        });
                    if (createdUser && createdUser.user && createdUser.user.createdUser) {
                        history.push('/test/home')
                        window.M.toast({ html: 'thank you for using our platform', classes: 'green' })

                    } else {
                        history.push('/test/login')
                        window.M.toast({ html: 'Please check your email to confirm your account', classes: 'orange' })
                    }
                })
                .catch(err => {
                    console.error(err);
                    setErrors(errors.concat(err))
                    setLoading(!loading)
                });
        }
    };

    const saveUser = createdUser => {
        return usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    };

    const handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
            ? "error"
            : "";
    };

    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450, marginTop: '10%' }}  >

                <Form onSubmit={handleSubmit} size="large">
                    <Segment stacked className='app'>
                        <img
                            src={userImg}
                            width="10%"
                            style={{ margin: "5px auto 20px", display: "block" }}
                            alt='img-user'
                        />
                        <Form.Input
                            fluid
                            name="username"
                            icon="user"
                            iconPosition="left"
                            placeholder="Pseudo"
                            onChange={(e) => handleChange(e, setUserName)}
                            value={username}
                            type="text"
                            style={{ borderRadius: '20px' }}
                            className='inputTextForUser'
                        />

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
                            placeholder=" Mot de Passe"
                            onChange={(e) => handleChange(e, setPassword)}

                            value={password}
                            className={handleInputError(errors, "password")}
                            type="password"
                        />

                        <Form.Input
                            fluid
                            name="passwordConfirmation"
                            icon="repeat"
                            iconPosition="left"
                            placeholder="Confirmation Mot de Passe"
                            onChange={(e) => handleChange(e, setConfirmation)}

                            value={passwordConfirmation}
                            className={handleInputError(errors, "password")}
                            type="password"
                        />

                        <Button
                            disabled={loading}
                            className={loading ? "loading" : ""}
                            color="black"
                            fluid
                            size="large"
                            style={{ marginBottom: "5px", borderRadius: '20px' }}
                        >
                            S'inscrire
              </Button>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                padding: "20px 8px",
                            }}
                        ></div>
                        {errors.length > 0 && (
                            <div error className="register">
                                <h3>Error</h3>
                                {displayErrors(errors)}
                            </div>
                        )}
                        <div className="register">
                            Déjà un utilisateur? <Link to="/test/login">Se connecter</Link>
                        </div>
                    </Segment>
                </Form>

            </Grid.Column>
        </Grid>
    );

}

export default Register;
