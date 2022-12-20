import {makeStyles} from "@material-ui/core/styles";


export default makeStyles({
    mainGrid: {
        marginTop: 0,
        position: "absolute",
        display: "flex",
        height: "91.5%",
        width: "100%"
    },
    leftGrid: {
        overflowY: "auto",
        maxHeight: "100%",
        width: "80%"
    },
    rightGrid:{
        backgroundColor: "#eeeeee",
        width: "20%",
    },
    rightGridButtons:{
        textAlign: "center"
    },
    buttonCreateCase: {
        margin: 15,
        minWidth: "70%",
        height: "45%",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        "&:hover":{
            backgroundColor: "#fffafa",
        },
    },
    buttonCreateSuite: {
        minWidth: "70%",
        height: "45%",
        backgroundColor: "#696969",
        color: "#FFFFFF",
        "&:hover":{
            backgroundColor: "#777676",
        },
    },
    mainGridFolderStructure:{
        height: "67%"
    },


})