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
        height: '100vh',
        border: 'none',
        [theme.breakpoints.up('md')]: {
            backgroundColor: '#b6b7c3',
        },
    },
    contentWrapper: {
        width: 'calc(100% - 75px)',
    },
}));

export default useStyles;
