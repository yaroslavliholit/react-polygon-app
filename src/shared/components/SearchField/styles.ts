import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => createStyles({
    searchWrapper: {
        borderBottom: '1px solid lightgray'
    },
    searchField: {
        border: 'none'
    }
}));

export default useStyles;
