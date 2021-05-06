import { useCallback, useEffect, useMemo, useState } from 'react';
import { ITickers } from '@polygon.io/client-js';
import { polygonReferenceClient } from '../api/polygonReferenceClient';
import { useHistory } from 'react-router-dom';

const useSearchTickers = () => {
  // ****** DATA START ******
  const history = useHistory();

  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ITickers[]>([]);

  const isSearchEmpty = Boolean(searchQuery.length && !suggestions.length);
  // ****** DATA END ******

  // ****** CALLBACKS START ******
  const handleChangeSearchQuery = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleFetchTickers = useCallback(async () => {
    setSuggestionsLoading(true);
    try {
      // @ts-ignore
      const { tickers } = await polygonReferenceClient.tickers({
        search: searchQuery,
        active: true,
        market: 'stocks',
        locale: 'US',
      });

      setSuggestions(tickers);
    } catch (e) {
      console.error(e);
    } finally {
      setSuggestionsLoading(false);
    }
  }, [searchQuery]);

  const handleSelectSuggestion = useCallback(
    (ticker: string) => () => {
      history.push(`/symbol/${ticker}`);
      setSearchQuery('');
    },
    [history]
  );
  // ****** CALLBACKS END ******

  // ****** EFFECTS START ******
  useEffect(() => {
    if (searchQuery) {
      handleFetchTickers();
    }
  }, [searchQuery, handleFetchTickers]);
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
