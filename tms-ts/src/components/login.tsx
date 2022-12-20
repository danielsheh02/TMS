import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Card} from "@material-ui/core";
import useStyles from "../styles/styles";
import AuthService from "../services/Authorization/auth.service";

const Login: React.FC = () => {
    const classes = useStyles()
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        AuthService.login(username, password)
            .then(() => window.location.assign("/"))
            .catch(() => setMessage("Введен неверный логин или пароль"))
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.paperLogin}>
                <div className={classes.divLogin}>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <form className={classes.formLogin}
                          onSubmit={handleLogin}
                    >
                        <TextField
                            className={classes.rootLogin}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Логин"
                            name="login"
                            autoComplete="on"
                            autoFocus
                            value={username}
                            onChange={onChangeUsername}
                        />
                        <TextField
                            className={classes.rootLogin}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            autoComplete="on"
                            label="Пароль"
                            type="password"
                            id="password"
                            value={password}
                            onChange={onChangePassword}
                        />
                        <Button
                            type="submit"
                            // onClick={handleLogin}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submitLogin}
                        >
                            Войти
                        </Button>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </Card>
        </Container>
    )
}

export default Login