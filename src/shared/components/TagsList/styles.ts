import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({
    tagsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    tagItem: {
        marginRight: 14,
        marginBottom: 14,
        padding: '6px 16px',
        borderRadius: 4,
        color: theme.palette.common.white,
    }
}));

export default useStyles;
