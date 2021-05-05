import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => createStyles({
    searchWrapper: {
        position: 'relative',
        borderBottom: '1px solid lightgray',
    },
    searchField: {
        border: 'none'
    },
    suggestionsWrapper: {
        position: 'absolute',
        top: 60,
        left: 20,
        maxWidth: 600,
        backgroundColor: '#ffffff'
    },
    suggestionTicker: {
        width: 80,
    },
    suggestionName: {
        width: 'calc(100% - 80px)'
    },
}));

export default useStyles;
