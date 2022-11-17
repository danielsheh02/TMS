import {Grid, Table, TableBody, tableCellClasses, TableContainer} from "@mui/material";
import React, {useEffect, useState} from "react";
import {suite, treeSuite} from "./suites.component";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

const Suite = (props: {
    row: treeSuite, nodeId: number, expandedSuites: string[], setExpandedSuites: (array: string[]) => void
}) => {
    const {row, expandedSuites, setExpandedSuites} = props;
    useEffect(() => {
        if (row.children.length > 0) {
            console.log(row)
            const newExpanded = expandedSuites.slice()
            console.log(newExpanded)
            newExpanded.push(row.id.toString())
            setExpandedSuites(newExpanded)
        }
    }, [])
    return (
        <TreeItem label={row.name} nodeId={row.id.toString()}>
            {row.children.map((suite: any, index: number) => (
                <Suite key={index} row={suite} nodeId={index}
                       expandedSuites={expandedSuites}
                       setExpandedSuites={setExpandedSuites}
                />
            ))}
        </TreeItem>
    );
}

const FolderSuites = (props: {
    suites: treeSuite[],
}) => {
    const {suites} = props;
    const [expandedSuites, setExpandedSuites] = useState<string[]>([])

    console.log(expandedSuites)
    return (
        <Grid>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                defaultExpanded={expandedSuites}
                // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
                {suites.map((suite, index) => (
                    <Suite key={index} row={suite} nodeId={index}
                           expandedSuites={expandedSuites}
                           setExpandedSuites={setExpandedSuites}
                    />
                ))}
            </TreeView>
        </Grid>
    );
}
export default FolderSuites