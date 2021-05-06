import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
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
      backgroundColor: theme.palette.primary.dark,
    },
    drawer: {
      width: 72,
      minHeight: '100vh',
      height: 'inherit',
      border: 'none',
      [theme.breakpoints.up('sm')]: {
        backgroundColor: theme.palette.text.disabled,
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    contentWrapper: {
      width: 'calc(100% - 75px)',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  })
);

export default useStyles;
