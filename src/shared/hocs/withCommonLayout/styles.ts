import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    logo: {
        width: 40,
        height: 40,
        margin: '10px auto',
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
    },
    drawer: {
        width: 75,
        height: '100vh',
        border: 'none',
        [theme.breakpoints.up('md')]: {
            backgroundColor: 'lightgray',
        },
    },
    contentWrapper: {
        width: 'calc(100% - 75px)',
    },
}));

export default useStyles;
