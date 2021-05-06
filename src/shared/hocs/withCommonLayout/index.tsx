import React, { ComponentType, PropsWithChildren } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchField from '../../components/SearchField';
import useStyles from './styles';

function withCommonLayout<T>(WrapperComponent: ComponentType<T>) {
  return (props: PropsWithChildren<T & {}>) => {
    const cn = useStyles();

    return (
      <div className={cn.root}>
        <CssBaseline />
        <aside className={cn.drawer}>
          <div className={cn.logo} />
        </aside>
        <div className={cn.contentWrapper}>
          <SearchField />
          <main>
            <WrapperComponent {...props} />
          </main>
        </div>
      </div>
    );
  };
}

export default withCommonLayout;
