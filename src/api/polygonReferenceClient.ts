import { referenceClient, restClient } from '@polygon.io/client-js';

import ENV from '../app/constants/env';

export const polygonReferenceClient = referenceClient(`${ENV.POLYGON_API_KEY}`);

export const polygonRestClient = restClient(`${ENV.POLYGON_API_KEY}`);
