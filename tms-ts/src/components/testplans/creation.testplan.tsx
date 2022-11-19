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
    TextField,
    Typography
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import moment, {Moment} from "moment";
import {testPlan, param} from "./testplans.component";
import TestPlanService from "../../services/testplan.service";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import BlockIcon from '@mui/icons-material/Block';
import {alpha} from "@material-ui/core";


interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
    testPlans: testPlan[];
    params: param[] | null;
}

interface Node {
    label: string;
    value: string;
    children?: Array<Node>;
    disabled?: boolean;
}

const CreationTestPlan2: React.FC<Props> = ({show, setShow, testPlans, params}) => {
    const classes = useStyles()

    const [link, setLink] = useState("")
    const [links, setLinks] = useState<string []>([])
    const [linkPresence, setLinkPresence] = useState(false)

    const [selectedTestPlan, setSelectedTestPlan] = useState<{ id: number | null, name: string }>({
        id: null,
        name: "Не выбрано"
    })

    // console.log(testPlans)
    /*useEffect(() => {
        if (testPlans.length != 0) {
            setSelectedTestPlan({id: testPlans[0].id, name: testPlans[0].name})
        }
    }, [testPlans])*/

    const [name, setName] = useState("")
    // const [namePresence, setNamePresence] = useState(false)

    const [startDate, setStartDate] = React.useState<Moment | null>(moment())
    const [endDate, setEndDate] = React.useState<Moment | null>(moment())

    const [paramsChecked, setParamsChecked] = useState<Array<string>>([])
    const [paramsExpanded, setParamsExpanded] = useState<Array<string>>([])
    const [disable, setDisable] = useState(false)

    const handleStartDate = (newValue: Moment | null) => {
        setStartDate(newValue);
    };

    const handleEndDate = (newValue: Moment | null) => {
        setEndDate(newValue);
    };

    const handleClose = () => {
        setLink("")
        setLinkPresence(false)
        setLinks([])
        setShow(false)
        setName("")
        // setNamePresence(false)
        setStartDate(moment())
        setEndDate(moment())
        setParamsChecked([])
        setParamsExpanded([])
        setDisable(false)
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

    const chooseTestPlan = (e: any) => {
        setSelectedTestPlan({id: e.target.value.id, name: e.target.value.name})
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let str = e.target.value
        setName(str)
        // setNamePresence(true)
    }

    const keyPressLink = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && linkPresence) {
            createLink()
        }
    }

    const createTestPlan = () => {
        let params = null
        if (!paramsChecked.includes('no') && paramsChecked.length != 0) {
            params = []
            for (let i of paramsChecked) {
                params.push(Number(i))
            }
        }
        const testPlan = {
            name: name,
            project: 1,
            parent: selectedTestPlan.id,
            tests: [],
            parameters: params,
            started_at: "2006-10-25 14:30:59",
            due_date: "2006-10-25 14:30:59",
        }
        TestPlanService.createTestPlan(testPlan)
        handleClose()
    }

    function nodesChildren() {
        let arr: Node[] = [];
        params?.map((param) => {
            let flag = false
            for (let node in arr) {
                if (arr[node].label == param.group_name) {
                    if (arr[node].children) {/*а это всегда true, но пусть будет*/
                        // @ts-ignore
                        arr[node].children.push({value: String(param.id), label: param.data, disabled: disable})
                    }
                    flag = true
                }
            }
            if (!flag) {
                arr.push({
                    value: param.group_name,
                    label: param.group_name,
                    children: [{value: String(param.id), label: param.data, disabled: disable}],
                    disabled: disable
                })
            }
        })

        return arr
    }

    const nodes = [{value: 'no', label: 'Без параметров', icon: <BlockIcon className={classes.icons}/>},
        {value: 'all', label: 'Все параметры', children: nodesChildren(), disabled: disable}];

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
                                onChange={(content) => onChangeName(content)}
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
                            <FormControl style={{minWidth: "50%"}} className={classes.textFieldCreationCase}>
                                {params ? (<CheckboxTree
                                        nodes={nodes}
                                        checked={paramsChecked}
                                        expanded={paramsExpanded}
                                        onCheck={(paramsChecked) => {
                                            setParamsChecked(paramsChecked)
                                            if (paramsChecked.find(x => x == 'no')) {
                                                setDisable(true)
                                                setParamsChecked(['no'])
                                                setParamsExpanded([])
                                            } else {
                                                setDisable(false)
                                            }
                                        }}
                                        onExpand={(paramsExpanded) => setParamsExpanded(paramsExpanded)}
                                        icons={{
                                            check: <CheckBoxOutlinedIcon className={classes.icons}/>,
                                            uncheck: <CheckBoxOutlineBlankIcon className={classes.icons}/>,
                                            halfCheck: <CheckBoxOutlinedIcon style={{color: alpha("#8956FF", 0.6)}}/>,
                                            expandClose: <ExpandMoreOutlinedIcon className={classes.icons}/>,
                                            expandOpen: <KeyboardArrowUpIcon className={classes.icons}/>,
                                            expandAll: <IndeterminateCheckBoxOutlinedIcon className={classes.icons}/>,
                                            collapseAll: <IndeterminateCheckBoxOutlinedIcon className={classes.icons}/>,
                                            parentClose: <FolderCopyOutlinedIcon className={classes.icons}/>,
                                            parentOpen: <FolderCopyOutlinedIcon className={classes.icons}/>,
                                            leaf: <ArticleOutlinedIcon className={classes.icons}/>,
                                        }}/>) :
                                    (<CheckboxTree nodes={[{
                                        value: 'no_params',
                                        label: 'Без параметров',
                                        disabled: true,
                                        showCheckbox: false,
                                        icon: <BlockIcon className={classes.icons}/>
                                    }]}
                                    />)
                                }

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

                            <FormControl style={{minWidth: "90%"}} className={classes.textFieldCreationCase}>
                                <InputLabel id="select-test-plan">Выберите тест-план</InputLabel>
                                <Select
                                    labelId="select-suite"
                                    value={selectedTestPlan.name}
                                    label="Выберите тест-план"
                                    onChange={(e) => chooseTestPlan(e)}
                                    renderValue={(selected) => <Grid>{selected}</Grid>}
                                >
                                    {testPlans.map((plan, index) => <MenuItem key={index}
                                                                              value={plan as any}>{plan.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid style={{marginBottom: 10}}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    label="Дата начала"
                                    inputFormat="DD/MM/YYYY"
                                    value={startDate}
                                    onChange={handleStartDate}
                                    className={classes.textFieldCreationCase}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid style={{marginBottom: 34}}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    label="Дата окончания"
                                    inputFormat="DD/MM/YYYY"
                                    value={endDate}
                                    onChange={handleEndDate}
                                    className={classes.textFieldCreationCase}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
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
                            <Button
                                onClick={createTestPlan}
                                style={{
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
    );
}

export default CreationTestPlan2