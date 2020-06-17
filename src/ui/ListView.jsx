import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableSortLabel, Toolbar, Paper, Box, Typography, TableContainer, Grid, InputBase, IconButton, Checkbox } from '@material-ui/core';
import { Search, GetApp, Publish } from '@material-ui/icons';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 550,
    },
    virticalSpacing: {
        height: 40
    },
}));

function createData(id, title, price, size, madeby, nutrition, detail) {
    return { id, title, price, size, madeby, nutrition, detail };
}

const rows = [
    createData('0000001', 'CROSSFIRE SWEAT 1', 10000, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000002', 'CROSSFIRE SWEAT 2', 10100, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000003', 'CROSSFIRE SWEAT 3', 102000, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000004', 'CROSSFIRE SWEAT 4', 10300, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000005', 'CROSSFIRE SWEAT 5', 10400, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000006', 'CROSSFIRE FULL SWEAT1', 11200, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000007', 'CROSSFIRE FULL SWEAT2', 12200, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000008', 'CROSSFIRE FULL SWEAT3', 13200, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000009', 'CROSSFIRE FULL SWEAT4', 14200, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000010', 'CROSSFIRE FULL SWEAT5', 13500, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000011', 'CROSSFIRE ZIPPED SWEAT1', 100, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000012', 'CROSSFIRE ZIPPED SWEAT2', 200, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000013', 'CROSSFIRE ZIPPED SWEAT3', 300, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000014', 'CROSSFIRE ZIPPED SWEAT4', 400, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000015', 'CROSSFIRE ZIPPED SWEAT5', 500, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000016', 'CROSSFIRE FULLZIPPED SWEAT1', 3000, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000017', 'CROSSFIRE FULLZIPPED SWEAT2', 3000, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000018', 'CROSSFIRE FULLZIPPED SWEAT3', 4000, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000019', 'CROSSFIRE FULLZIPPED SWEAT4', 4000, 'S,M,L,XL', '中国', '綿100%', true),
    createData('0000020', 'CROSSFIRE FULLZIPPED SWEAT5', 3200, 'S,M,L,XL', '中国', '綿100%', true),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'id', numeric: false, disablePadding: false, label: '商品id' },
    { id: 'title', numeric: false, disablePadding: false, label: 'タイトル' },
    { id: 'price', numeric: true, disablePadding: false, label: '値段' },
    { id: 'size', numeric: false, disablePadding: false, label: 'サイズ' },
    { id: 'madeby', numeric: false, disablePadding: false, label: '生産国' },
    { id: 'nutrition', numeric: false, disablePadding: false, label: '混率' },
    { id: 'detail', numeric: false, disablePadding: false, label: '詳細' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.primary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    files: {
        textAlign: 'right'
    },
    searchBox: {
        border: "1px solid orange",
        padding: '2px 4px',
        display: 'flex',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Grid container>
                <Grid item xs={3} >
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        ささげ商品
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Paper component="form" className={classes.searchBox}>
                        <InputBase
                            className={classes.input}
                            placeholder="プロダクト名, JANコード検索"
                            inputProps={{ 'aria-label': 'プロダクト名 JANコード' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <Search />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={3} className={classes.files}>
                    <IconButton><GetApp /></IconButton>
                    <IconButton><Publish /></IconButton>
                </Grid>
            </Grid>
        </Toolbar>
    );
};




export default function ListView(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);

        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Box className={classes.virticalSpacing} ></Box>
            <Paper className={classes.paper} >
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none" align="center"><Link to={'/Detail/' + row.id + '/'}>{row.id}</Link></TableCell>
                                            <TableCell align="center">{row.title}</TableCell>
                                            <TableCell align="center">{row.price}</TableCell>
                                            <TableCell align="center">{row.size}</TableCell>
                                            <TableCell align="center">{row.madeby}</TableCell>
                                            <TableCell align="center">{row.nutrition}</TableCell>
                                            <TableCell align="center">{row.detail ? '◯' : '☓'}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

        </div >
    );
}

