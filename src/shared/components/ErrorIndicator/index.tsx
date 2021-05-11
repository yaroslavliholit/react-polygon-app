import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';

import useStyles from '../../../pages/SymbolDetailsPage/styles';

interface Props {
  displayVariant?: 'small' | 'default';
}

const ErrorIndicator = ({ displayVariant = 'default' }: Props) => {
  const cn = useStyles();
  const typographySizeVariant = displayVariant === 'default' ? 'h4' : 'body1';

  return (
    <div className={cn.networkIndicatorWrapper}>
      <Typography variant={typographySizeVariant}>
        Something went wrong. Please try again later.
      </Typography>
    </div>
  );
};

export default memo(ErrorIndicator);
