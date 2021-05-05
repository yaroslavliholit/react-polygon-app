import React, {memo, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import {SearchPage, SymbolDetailsPage} from './lazyPages';
import ROUTES_PATHS from './paths';

import {CircularProgress} from '@material-ui/core'

const AppRoutes = () => (
    <Switch>
        <Suspense fallback={<CircularProgress />}>
            <Route exact path={ROUTES_PATHS.search} component={SearchPage} />
            <Route exact path={ROUTES_PATHS.symbolDetails} component={SymbolDetailsPage} />
        </Suspense>
    </Switch>
);

export default memo(AppRoutes);
