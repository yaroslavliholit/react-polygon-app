import React, {memo, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import {SearchPage} from './lazyPages';
import ROUTES_PATHS from './paths';

import {CircularProgress} from '@material-ui/core'

const AppRoutes = () => (
    <Switch>
        <Suspense fallback={<CircularProgress />}>
            <Route path={ROUTES_PATHS.search} component={SearchPage} />
        </Suspense>
    </Switch>
);

export default memo(AppRoutes);
