const ROUTES_PATHS = {
  search: '/',
  symbolDetails: '/symbol/:id',
  getSymbolDetailsUrl(id: string) {
    return `/symbol/${id}`;
  }
};

export default ROUTES_PATHS;
