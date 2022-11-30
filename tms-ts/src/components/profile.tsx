import React, {useEffect, useState} from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Button, Checkbox, FormControlLabel, Paper, TextField} from "@mui/material";
import {user} from "./models.interfaces";
import ProjectService from "../services/project.service";

const Profile: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<user>()
    const currentUsername = localStorage.getItem('currentUsername')

    useEffect(() => {
        ProjectService.getUsers().then((response) => {
            const users: user[] = response.data
            setCurrentUser(users.find((user) => user.username == currentUsername))
            setIsLoaded(true)
        })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    if (isLoaded) {
        return <Paper style={{
            padding: '10px 10px 10px 10px',
            display: 'flex',
            flexDirection: 'column',
            margin: '50px auto auto auto',
            width: '50%',
            alignItems: 'center'
        }}>
            <AccountBoxIcon fontSize={'large'} sx={{margin: '10px 10px 10px 10px'}}/>

            <TextField disabled label={'Имя пользователя'} sx={{margin: '10px 10px 10px 10px'}}
                       defaultValue={currentUser?.username}/>
            <TextField label={'Пароль'} sx={{margin: '10px 10px 10px 10px'}} type={"password"}/>
            <TextField label={'Имя'} sx={{margin: '10px 10px 10px 10px'}} defaultValue={currentUser?.first_name}/>
            <TextField label={'Фамилия'} sx={{margin: '10px 10px 10px 10px'}} defaultValue={currentUser?.last_name}/>
            <TextField label={'Адрес электронной почты'} sx={{margin: '10px 10px 10px 10px'}}
                       defaultValue={currentUser?.email}/>
            <FormControlLabel control={<Checkbox defaultChecked/>} label={"Статус персонала"}/>
            <FormControlLabel control={<Checkbox defaultChecked/>} label={"Активный"}/>

            <Button variant={"contained"} sx={{margin: '10px 10px 10px 10px'}}>Сохранить</Button>
        </Paper>
    } else
        return <></>
}

export default Profile