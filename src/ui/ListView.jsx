import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableSortLabel, Toolbar, Paper, Box, Typography, TableContainer, Grid, InputBase, IconButton, } from '@material-ui/core';
import { Search, GetApp, Publish, Block } from '@material-ui/icons';
import { Link } from "react-router-dom";

const rows = [
    { id: '0000001', title: 'CROSSFIRE SWEAT 1', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000002', title: 'CROSSFIRE SWEAT 2', productType: 'ささげ済み', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000003', title: 'CROSSFIRE SWEAT 3', productType: '未公開', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000004', title: 'CROSSFIRE SWEAT 4', productType: '予約販売停止', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000005', title: 'CROSSFIRE SWEAT 5', productType: '予約販売', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000006', title: 'CROSSFIRE1', productType: '販売中', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000007', title: 'CROSSFIRE2', productType: '予約販売', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000008', title: 'CROSSFIRE3', productType: 'SALE', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000009', title: 'CROSSFIRE4', productType: '販売終了', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000010', title: 'CROSSFIRE5', productType: 'SALE', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000011', title: 'SWEAT 1', productType: '販売中', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000012', title: 'SWEAT 2', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000013', title: 'SWEAT 3', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000014', title: 'SWEAT 4', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000015', title: 'SWEAT 5', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000016', title: 'FIRE SWEAT 1', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000017', title: 'FIRE SWEAT 2', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000018', title: 'FIRE SWEAT 3', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000019', title: 'FIRE SWEAT 4', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
    { id: '0000020', title: 'FIRE SWEAT 5', productType: '予定商品', price: 10000, compareAt: 9000, size: 'S,M,L,XL', lastModified: '2020-02-22 22:22:22', mall: { 'amazon': true, 'rakuten': true, 'andmall': true } },
];

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
    { id: 'id', numeric: false, label: '商品id' },
    { id: 'title', numeric: false, label: 'タイトル' },
    { id: 'productType', numeric: false, label: 'ステータス' },
    { id: 'price', numeric: true, label: '値段' },
    { id: 'compareAt', numeric: true, label: '予定商品価格' },
    { id: 'size', numeric: false, label: 'サイズ' },
    { id: 'lastModified', numeric: false, label: '最終更新日' },
    { id: 'mall', numeric: false, label: '連携モール' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

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
                                    {order === 'desc' ? '(降順)' : '(昇順)'}
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
    return (
        <Toolbar>
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
    const [list, setList] = React.useState({
        mall: { amazon: true, rakuten: true, andmall: true }
    })
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const switchAvailable = (row, target) => {
        console.log(target);
        let bool = false;
        if (list.mall[target] === true) {
            bool = false;
        } else {
            bool = true;
        }
        let newmall = list.mall;
        newmall = { ...newmall, [target]: bool };
        setList({ mall: newmall });
        console.log(list);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Box className={classes.virticalSpacing} ></Box>
            <Paper className={classes.paper} >
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}

                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    ;
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell align="center" id={labelId}><Link to={'/Detail/' + row.id + '/'}>{row.id}</Link></TableCell>
                                            <TableCell align="center">{row.title}</TableCell>
                                            <TableCell align="center">{row.productType}</TableCell>
                                            <TableCell align="center">{row.price}</TableCell>
                                            <TableCell align="center">{row.compareAt}</TableCell>
                                            <TableCell align="center">{row.size}</TableCell>
                                            <TableCell align="center">{row.lastModified}</TableCell>
                                            <TableCell align="center">
                                                <IconButton id="amazon" onClick={() => (switchAvailable(row, 'amazon'))}>
                                                    {list.mall.amazon ?
                                                        <img src={process.env.PUBLIC_URL + '/amazon.png'} alt="amazon" /> : <Block />
                                                    }
                                                </IconButton>
                                                <IconButton id="raktuen" onClick={() => (switchAvailable(row, 'rakuten'))}>
                                                    {list.mall.rakuten ?
                                                        <img src={process.env.PUBLIC_URL + '/rakuten.png'} alt="rakuten" /> : <Block />
                                                    }
                                                </IconButton>
                                                <IconButton id="andmall" onClick={() => (switchAvailable(row, 'andmall'))}>
                                                    {list.mall.andmall ?
                                                        <img src={process.env.PUBLIC_URL + '/andmall.png'} alt="andmall" /> : <Block />
                                                    }
                                                </IconButton>
                                            </TableCell>
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

