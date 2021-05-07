import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    searchWrapper: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.grey[50]}`,
    },
    menuButtonWrapper: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRight: `1px solid ${theme.palette.grey[50]}`,
      },
    },
    searchField: {
      border: 'none',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 55px)',
      },
    },
    suggestionsWrapper: {
      position: 'absolute',
      top: 60,
      left: 20,
      maxWidth: 600,
      maxHeight: 250,
      zIndex: theme.zIndex.tooltip,
      overflowY: 'auto',
      overflowX: 'hidden',
      backgroundColor: theme.palette.grey[100],
      [theme.breakpoints.down('md')]: {
        left: 0,
      },
    },
    suggestionItem: {
      cursor: 'pointer',
    },
    suggestionTicker: {
      width: 80,
      [theme.breakpoints.down('md')]: {
        width: 70,
      },
    },
    suggestionName: {
      width: 'calc(100% - 80px)',
      [theme.breakpoints.down('md')]: {
        width: 'calc(100% - 70px)',
      },
    },
    clip: {
      width: 300,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  })
);

export default useStyles;
