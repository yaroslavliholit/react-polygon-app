import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(
  createStyles({
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px 0',
    },
  })
);

export default useStyle;
