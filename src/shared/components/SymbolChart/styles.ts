import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.common.white,
      width: '100%',
      maxWidth: 1400,
      height: '332px',
      [theme.breakpoints.down('sm')]: {
        height: '150px',
      },
    },
    chart: {
      width: '100%',
      height: '332px',
      [theme.breakpoints.down('sm')]: {
        height: '150px',
      },
    },
  })
);

export default useStyle;
