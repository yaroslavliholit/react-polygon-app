import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(createStyles({
    tagsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    tagItem: {
        marginRight: 14,
        marginBottom: 14,
        padding: '6px 16px',
        borderRadius: 4,
        color: '#ffffff'
    }
}));

export default useStyles;
