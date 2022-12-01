import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Button, Checkbox, FormControlLabel, Paper, TextField, Typography} from "@mui/material";
import {user} from "./models.interfaces";
import ProjectService from "../services/project.service";
import ProfileService from "../services/profile.service";

const Profile: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<user>()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [isStaff, setIsStaff] = useState<boolean>(true)
    const [isActive, setIsActive] = useState<boolean>(true)
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const currentUsername = localStorage.getItem('currentUsername')

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
    const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
    const handleChangeCurrentPassword = (event: ChangeEvent<HTMLInputElement>) => setCurrentPassword(event.target.value)
    const handleChangeIsStaff = (event: SyntheticEvent<Element, Event>, checked: boolean) => setIsStaff(checked)
    const handleChangeIsActive = (event: SyntheticEvent<Element, Event>, checked: boolean) => setIsActive(checked)

    const handleOnSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (currentUser) {
            ProfileService.changeUser(currentUser?.id, {
                username: username,
                password: currentPassword,
                first_name: firstName
            }).then(() => window.location.assign('/profile')).catch(() => setMessage("Пожалйста проверьте введенные данные"))
        }
    }

    useEffect(() => {
        ProjectService.getUsers().then((response) => {
            const users: user[] = response.data
            const user: user | undefined = users.find((user) => user.username == currentUsername)
            setCurrentUser(user)
            setIsLoaded(true)
            setUsername(user?.username ?? username)
            setFirstName(user?.first_name ?? firstName)
            setLastName(user?.last_name ?? lastName)
            setEmail(user?.email ?? email)
        })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    if (isLoaded) {
        return <>
            <Typography textAlign={"center"} mt={'15px'}>
                {message}
            </Typography>
            <Paper style={{
                padding: '10px 10px 10px 10px',
                display: 'flex',
                flexDirection: 'column',
                margin: '15px auto auto auto',
                width: '50%',
                alignItems: 'center'
            }}>
                <AccountBoxIcon fontSize={'large'} sx={{margin: '10px 10px 10px 10px'}}/>

                <form onSubmit={handleOnSaveClick}
                      style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <TextField required label={'Имя пользователя'} sx={{margin: '10px 10px 10px 10px'}}
                               value={username} onChange={handleChangeUsername}/>
                    <TextField label={'Пароль'} sx={{margin: '10px 10px 10px 10px'}} type={"password"} value={password}
                               onChange={handleChangePassword}/>
                    <TextField required type={"password"} label={'Текущий пароль'} sx={{margin: '10px 10px 10px 10px'}}
                               value={currentPassword} onChange={handleChangeCurrentPassword}/>
                    <TextField label={'Имя'} sx={{margin: '10px 10px 10px 10px'}} value={firstName}
                               onChange={handleChangeFirstName}/>
                    <TextField label={'Фамилия'} sx={{margin: '10px 10px 10px 10px'}} value={lastName}
                               onChange={handleChangeLastName}/>
                    <TextField label={'Адрес электронной почты'} sx={{margin: '10px 10px 10px 10px'}}
                               value={email} onChange={handleChangeEmail}/>
                    <FormControlLabel control={<Checkbox checked={isStaff}/>} label={"Статус персонала"}
                                      onChange={handleChangeIsStaff}/>
                    <FormControlLabel control={<Checkbox checked={isActive}/>} label={"Активный"}
                                      onChange={handleChangeIsActive}/>

                    <Button type={"submit"} variant={"contained"}
                            sx={{margin: '10px 10px 10px 10px'}}>Сохранить</Button>
                </form>
            </Paper></>
    } else
        return <></>
}

export default Profile