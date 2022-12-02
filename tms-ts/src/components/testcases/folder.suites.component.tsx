import {Grid, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from "react";
import {suite, treeSuite} from "./suites.component";
import TreeView from "@mui/lab/TreeView";
import TreeItem, {TreeItemContentProps, useTreeItem} from "@mui/lab/TreeItem";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";

import {alpha, styled} from '@mui/material/styles';
import {TreeItemProps, treeItemClasses} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import ProjectService from "../../services/project.service";

function MinusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{width: 14, height: 14}}>
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z"/>
        </SvgIcon>
    );
}

function PlusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{width: 14, height: 14}}>
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z"/>
        </SvgIcon>
    );
}

function CloseSquare(props: SvgIconProps) {
    return (
        <SvgIcon
            className="close"
            fontSize="inherit"
            style={{width: 14, height: 14, justifyContent: "start"}}
        >
            {/* tslint:disable-next-line: max-line-length */}
            <path
                d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z"/>
        </SvgIcon>
    );
}

const CustomContent = React.forwardRef(function CustomContent(
    props: TreeItemContentProps,
    ref,
) {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
    } = props;

    const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        handleSelection,
        preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        preventSelection(event);
    };
    const handleExpansionClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        handleExpansion(event);
    };

    const handleSelectionClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        handleSelection(event);
        // @ts-ignore
        document.getElementById(nodeId).scrollIntoView();
    };
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={clsx(className, classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.focused]: focused,
                [classes.disabled]: disabled,
            })}
            style={{width: "max-content"}}
            onMouseDown={handleMouseDown}
            ref={ref as React.Ref<HTMLDivElement>}
        >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={handleExpansionClick} className={classes.iconContainer}>
                {icon}
            </div>
            {/*<a href={"#" + nodeId}>*/}
            <Typography
                onClick={(e) => handleSelectionClick(e)}
                component="div"
                sx={{fontSize: 15}}
                // className={classes.label}
            >
                {label}
            </Typography>
            {/*</a>*/}
        </div>
    );
});


const StyledTreeItem = styled((props: TreeItemProps) => (
    <TreeItem ContentComponent={CustomContent} {...props}/>
))(({theme}) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 2,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    [`& .${treeItemClasses.root}`]: {
        marginTop: 3,
        marginBottom: 3,
        '& .MuiTreeItem-label': {
            maxWidth: 250,
            // wordWrap: "break-word"
            // minWidth: "max-content"
        },
        // '& .MuiTreeItem-content': {
        //     // wordWrap: "break-word",
        //     // minWidth: "max-content"
        // }
    },
}));

const Suite = (props: {
    row: treeSuite, nodeId: number
}) => {
    const {row} = props;
    return (
        <StyledTreeItem label={row.name} nodeId={row.id.toString()}>
            {row.children.map((suite: any, index: number) => (
                <Suite key={index} row={suite} nodeId={index}
                />
            ))}
        </StyledTreeItem>
    );
}

const FolderSuites = (props: {
    treeSuites: treeSuite[],
    suites: suite []
}) => {
    const {treeSuites, suites} = props;
    const [expanded, setExpanded] = useState<string[]>([])
    const [selected, setSelected] = useState<string[]>([])
    const [name, setName] = useState("")

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds);
    };

    useEffect(() => {
        const suitesIdArray: string[] = []
        suites.map((suite, index) => (
            suitesIdArray.push(suite.id.toString())
        ))
        setExpanded(suitesIdArray)
    }, [suites]);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value) {
            const foundSuites = suites.filter(suite => suite.name.toLowerCase().includes(e.target.value.toLowerCase()))
            const suitesIdArray: string[] = []
            foundSuites.map((suite, index) => (
                suitesIdArray.push(suite.id.toString())
            ))
            setSelected(suitesIdArray)
            // setName(e.target.value)
        } else{
            setSelected([])
        }
    }

    return (
        <Grid>
            <TextField
                id="nameCaseTextField"
                // className={classes.textFieldSelectCreationCaseSuite}
                onChange={(content) => onChangeName(content)}
                variant="outlined"
                // value={name}
                margin="normal"
                autoComplete="off"
                required
                fullWidth
                label="Введите название тест-кейса"
            >

            </TextField>
            <TreeView
                aria-label="customized"
                expanded={expanded}
                selected={selected}
                defaultCollapseIcon={<MinusSquare/>}
                defaultExpandIcon={<PlusSquare/>}
                defaultEndIcon={<CloseSquare/>}
                onNodeToggle={handleToggle}
                // onNodeSelect={handleSelect}
                sx={{
                    flexGrow: 1,
                    margin: 1,
                    textAlign: "left",
                }}
            >
                {treeSuites.map((suite, index) => (
                    <Suite key={index} row={suite} nodeId={index}
                    />
                ))}
            </TreeView>
        </Grid>
    );
}
export default FolderSuites