import React, {useState} from "react";
import useStyles from "../../styles/styles";
import {
    Button,
    Chip,
    Dialog,
    FormControl,
    Grid, IconButton, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
    show: boolean;
    setShow: (show: boolean) => void
}

const CreationTestPlan: React.FC<Props> = ({show, setShow}) => {
    const classes = useStyles()

    const [link, setLink] = useState("")
    const [links, setLinks] = useState<string []>([])
    const [linkPresence, setLinkPresence] = useState(false)

    const [testPlans, setTestPlans] = useState<string []>(["Тест-план 1", "Тест-план 2"])
    const [selectedTestPlan, setSelectedTestPlan] = useState("")

    const [params, setParams] = useState<string []>(["Параметр 1", "Параметр 2"])
    const [selectedParams, setSelectedParams] = useState("Без параметров")

    const handleClose = () => {
        setLink("")
        setLinkPresence(false)
        setLinks([])
        setShow(false)
    }

    const handleDeleteLink = (index: number) => {
        let oldLinks = links.slice()
        oldLinks.splice(index, 1)
        setLinks(oldLinks)
    }

    const createLink = () => {
        setLinks((prevState) => (prevState.concat([link])))
        setLinkPresence(false)
        setLink("")
    }

    const onChangeLinkContent = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const strInput = e.target.value.trim()
        if (strInput.length > 0) {
            setLink(strInput)
            setLinkPresence(true)
        } else {
            setLink(strInput)
            setLinkPresence(false)
        }
    }

    const chooseTestPlan = (e: SelectChangeEvent) => {
        setSelectedTestPlan(e.target.value)
    }

    const chooseParam = (e: SelectChangeEvent) => {
        setSelectedParams(e.target.value)
    }

    const keyPressLink = (e: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(linkPresence)
        if (e.key === "Enter" && linkPresence) {
            createLink()
        }
    }

    return (
        <Dialog
            disableEnforceFocus
            open={show}
            onClose={handleClose}
            classes={{paper: classes.paperCreationTestCase}}
        >
            <Grid container style={{
                position: "absolute",
                height: "100%",
                width: "100%"
            }}>
                <Grid xs={9} item style={{padding: 20}}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography variant="h6" style={{padding: 25}}>
                                Название
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                className={classes.textFieldCreationCase}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Введите название тест-плана"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className={classes.gridContent}>
                        <Grid item xs={2}>
                            <Typography variant="h6">
                                Параметры
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl style={{minWidth: "50%"}}>
                                <InputLabel id="select-params">Выбор параметров</InputLabel>
                                <Select
                                    labelId="select-params"
                                    value={selectedParams}
                                    label="Выберите параметры"
                                    onChange={(e) => chooseParam(e)}
                                    renderValue={(selected) => <Grid>{selected}</Grid>}
                                >
                                    {params.map((param, index) => <MenuItem key={index}
                                                                            value={param}>{param}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Typography variant="h6">
                        Тест-кейсы
                    </Typography>
                </Grid>

                <Grid xs={3} item style={{
                    backgroundColor: "#eeeeee", paddingTop: 26, display: "flex",
                    flexDirection: "column", justifyContent: "space-between"
                }}>
                    <Grid style={{marginLeft: 15}}>
                        <Grid style={{marginBottom: 34}}>
                            <Typography style={{marginBottom: 10}}>
                                Родительский тест-план
                            </Typography>

                            <FormControl required style={{minWidth: "90%"}}>
                                <InputLabel id="select-suite">Выберите тест-план</InputLabel>
                                <Select
                                    labelId="select-suite"
                                    value={selectedTestPlan}
                                    label="Выберите сьюту"
                                    onChange={(e) => chooseTestPlan(e)}
                                    renderValue={(selected) => <Grid>{selected}</Grid>}
                                >
                                    {testPlans.map((plan, index) => <MenuItem key={index}
                                                                              value={plan}>{plan}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid style={{marginBottom: 34}}>
                            <Typography>
                                Дата начала
                            </Typography>
                            <Typography>
                                Дата окончания
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography>
                                Ссылки
                            </Typography>
                            <TextField
                                value={link}
                                onChange={(content) => onChangeLinkContent(content)}
                                style={{marginTop: 10}}
                                className={classes.textFieldCreationCase}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Введите URL"
                                onKeyPress={(key) => keyPressLink(key)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton size={"small"} onClick={() => {
                                                if (linkPresence) {
                                                    createLink()
                                                }
                                            }}>
                                                <AddCircleIcon fontSize={"medium"}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid className={classes.stackTags}>
                                {links.map((link, index) =>
                                    <Grid>
                                        <Chip key={index} label={link} style={{
                                            margin: 3,
                                            maxWidth: "95%",
                                            color: "#0000FF",
                                            textDecoration: "underline"
                                        }}
                                              onDelete={() => handleDeleteLink(index)}
                                              onClick={() => {
                                                  const url = link.match(/^http[s]?:\/\//) ? link : '//' + link;
                                                  window.open(url, '_blank')
                                              }}
                                        />
                                        <br/>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{textAlign: "center"}}>
                        <Grid>
                            <Button onClick={handleClose} style={{
                                marginRight: 7,
                                marginBottom: 20,
                                width: "40%",
                                height: "45%",
                                backgroundColor: "#FFFFFF",
                                color: "#000000",
                            }}
                            >
                                Отменить
                            </Button>
                            <Button style={{
                                marginLeft: 7,
                                marginBottom: 20,
                                width: "40%",
                                height: "45%",
                                backgroundColor: "#696969",
                                color: "#FFFFFF",
                            }}
                            >
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default CreationTestPlan