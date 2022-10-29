import {makeStyles} from "@material-ui/core/styles";


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
    }
});
