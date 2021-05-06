import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => createStyles({
    container: {
        backgroundColor: theme.palette.common.white,
        width: '100%'
    },
}));

export default useStyle;
