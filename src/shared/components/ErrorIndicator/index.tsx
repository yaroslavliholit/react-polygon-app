import React, {memo} from 'react';
import Typography from "@material-ui/core/Typography";
import useStyles from '../../../pages/SymbolDetailsPage/styles';

const ErrorIndicator = () => {
  const cn = useStyles();
  return (
    <div className={cn.networkIndicatorWrapper}>
      <Typography variant={'h4'}>Something went wrong. Please try again later.</Typography>
    </div>
  );
}

export default memo(ErrorIndicator);
