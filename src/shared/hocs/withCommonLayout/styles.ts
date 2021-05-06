import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#FCFCFC',
    },
    logo: {
        width: 35,
        height: 35,
        margin: '10px auto',
        borderRadius: '50%',
        backgroundColor: '#001458',
    },
    drawer: {
        width: 72,
        minHeight: '100vh',
        height: 'inherit',
        border: 'none',
        [theme.breakpoints.up('md')]: {
            backgroundColor: '#b6b7c3',
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    contentWrapper: {
        width: 'calc(100% - 75px)',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
}));

export default useStyles;
