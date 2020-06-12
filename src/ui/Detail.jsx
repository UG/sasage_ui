import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Editor from '../editor';
import { CssBaseline, Typography, Container, Grid, Paper, Box, TextField, GridList, GridListTile, GridListTileBar } from '@material-ui/core/';
import { DropzoneArea } from 'material-ui-dropzone';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    spacingVertical: {
        height: 50,
    },
    red: {
        textAlign: 'left',
        backgroundColor: 'red',
    },
    blue: {
        textAlign: 'left',
        backgroundColor: 'blue',
    },
    orange: {
        textAlign: 'left',
        backgroundColor: 'orange',
    },
    purple: {
        textAlign: 'left',
        backgroundColor: 'purple',
    },
}));

const imgList = [
    'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a001.jpg',
    'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a002.jpg',
    'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a003.jpg',
    'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a004.jpg',
    'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a005.jpg',
];


export default function FixedContainer() {
    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false
    }
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box className={classes.spacingVertical} />
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Container className={classes.red}>
                            <DropzoneArea />
                        </Container>
                        <Box>
                            <GridList className={classes.gridList} cols={4.5}>
                                {imgList.map((src) => (
                                    <GridListTile >
                                        <img src={src} />
                                        <GridListTileBar title="MODEL 身長：173cm/着用サイズ TOPS：Lサイズ" />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Container >
                            <Box className={classes.orange}>
                                <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth />
                            </Box>
                            <Box className={classes.blue}>
                                <Editor
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent(newContent)}
                                    onChange={newContent => { }}
                                />
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment >
    );
}
