import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({
    searchWrapper: {
        position: 'relative',
        borderBottom: '1px solid #e9ecf4',
    },
    searchField: {
        border: 'none'
    },
    suggestionsWrapper: {
        position: 'absolute',
        top: 60,
        left: 20,
        maxWidth: 600,
        maxHeight: 250,
        zIndex: theme.zIndex.tooltip,
        overflow: 'scroll',
        backgroundColor: '#FCFCFC',
        [theme.breakpoints.down('md')]: {
            left: 0,
        },
    },
    suggestionItem: {
      cursor: 'pointer',
    },
    suggestionTicker: {
        width: 80,
    },
    suggestionName: {
        width: 'calc(100% - 80px)',
    },
    clip: {
        padding: 5,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));

export default useStyles;
