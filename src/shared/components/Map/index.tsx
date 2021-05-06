import React from 'react';
import MockMapImage from '../../assets/images/map.png';
import useStyles from './styles';

const Map = () => {
  const cn = useStyles();

  return <img src={MockMapImage} className={cn.imageWrapper} alt="Map" />;
};

export default Map;
