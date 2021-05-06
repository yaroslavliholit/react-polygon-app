import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(createStyles({
    imageWrapper: {
        width: '100%',
        maxWidth: 508,
        height: 164,
        objectFit: 'cover',
    }
}));

export default useStyles;
