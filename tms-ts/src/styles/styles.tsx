import {makeStyles} from "@material-ui/core/styles";
import {alpha} from "@mui/material";


export default makeStyles({
    button: {
        backgroundColor: "#ff0000",
    },
    paperCreationTestCase: {
        minWidth: "94%",
        minHeight: "93%",
    },
    paperCreationSuite: {
        minWidth: "65%",
        minHeight: "65%",
    },
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: -20
    },
    textFieldCreationCase: {
        "& .MuiFormLabel-root": {
            margin: 0
        },
        maxWidth: "90%",
    },
    gridContent: {
        marginTop: 20,
    },
    stackTags: {
        maxWidth: "90%",
        maxHeight: 150,
        marginTop: 8,
        overflowY: "auto",
    },
    tagsInput: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: -20
    },
    tut: {
        backgroundColor: "red"
    },
    buttonTxt: {
        "& .MuiButton-textSizeMedium": {
            fontSize: 50
        },
    },
    rootLogin: {
        "& .MuiFormLabel-root": {
            margin: 0
        }
    },
    divLogin: {
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperLogin: {
        marginTop: 40,
        // width: 500,
        minWidth: 300,
        minHeight: 300
    },
    formLogin: {
        width: '100%',
        marginTop: 5,
    },
    submitLogin: {
        backgroundColor: '#3f51b5',
    },
    divProjectSelectionPage: {
        // width: '60%',
        marginTop: 100,
        alignItems: 'center',
        flexDirection: 'column',
    },
    divProjectSelectionPageLine: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
    },
    paperCreationProject: {
        borderRadius: 10
    },
    chipTagsStatusInSuites: {
        minWidth: 90,
        maxHeight: 25,
        padding: 3,
    },
    gridTags: {
        overflowY: "hidden",
        maxHeight: 70,
    },
    icons: {
        color: "#8956FF",
    }
});
