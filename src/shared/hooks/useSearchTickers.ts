import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ITickers } from '@polygon.io/client-js';
import debounce from 'lodash.debounce';

import ROUTES_PATHS from '../../app/routes/paths';
import { polygonReferenceClient } from '../../api/polygonReferenceClient';

const useSearchTickers = () => {
  // ****** DATA START ******
  const history = useHistory();

  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ITickers[]>([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  // ****** DATA END ******

  // ****** CALLBACKS START ******
  const handleChangeSearchQuery = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleFetchTickers = useCallback( async () => {
    setSuggestionsLoading(true);
    try {
      const { tickers } = await polygonReferenceClient.tickers({
        search: searchQuery,
        active: true,
        market: 'stocks',
        locale: 'US',
      }) as unknown as { tickers: ITickers[] };

      setSuggestions(tickers);

      if (!tickers.length) {
        setIsSearchEmpty(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSuggestionsLoading(false);
    }
  }, [searchQuery]);

  const handleTriggerSearchTickers = useMemo(() => {
    return debounce(handleFetchTickers, 300);
  }, [handleFetchTickers]);

  const handleSelectSuggestion = useCallback(
    (ticker: string) => () => {
      history.push(ROUTES_PATHS.getSymbolDetailsUrl(ticker));
      setSearchQuery('');
    },
    [history]
  );
  // ****** CALLBACKS END ******

  // ****** EFFECTS START ******
  useEffect(() => {
    if (!searchQuery) {
      setIsSearchEmpty(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      handleTriggerSearchTickers();

      return handleTriggerSearchTickers.cancel;
    }
  }, [searchQuery, handleTriggerSearchTickers]);
  // ****** EFFECTS END ******

  return useMemo(
    () => ({
      suggestionsLoading,
      isSearchEmpty,
      suggestions,
      searchQuery,
      handleChangeSearchQuery,
      handleSelectSuggestion,
    }),
    [
      suggestionsLoading,
      isSearchEmpty,
      suggestions,
      searchQuery,
      handleSelectSuggestion,
      handleChangeSearchQuery,
    ]
  );
};

export default useSearchTickers;
