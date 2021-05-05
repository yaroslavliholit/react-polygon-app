import {useCallback, useEffect, useMemo, useState} from "react";
import {ITickers} from "@polygon.io/client-js";
import {polygonReferenceClient} from '../api/polygonReferenceClient';
import { useHistory } from 'react-router-dom';

const useSearchTickers = () => {
    // ****** DATA START ******
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<ITickers[]>([]);
    // ****** DATA END ******

    // ****** CALLBACKS START ******
    const handleChangeSearchQuery = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleFetchTickers = useCallback(async () => {
        // @ts-ignore
        const { tickers } = await polygonReferenceClient.tickers({
            search: searchQuery,
            active: true,
            market: 'stocks',
        });

        setSuggestions(tickers);
    }, [searchQuery]);

    const handleSelectSuggestion = useCallback((ticker: string) => () => {
        history.push(`/symbol/${ticker}`)
    }, [history]);
    // ****** CALLBACKS END ******

    // ****** EFFECTS START ******
    useEffect(() => {
        if (searchQuery) {
            handleFetchTickers();
        }
    }, [searchQuery, handleFetchTickers]);
    // ****** EFFECTS END ******

    return useMemo(() => ({
        suggestions,
        searchQuery,
        handleChangeSearchQuery,
        handleSelectSuggestion,
    }), [
        suggestions,
        searchQuery,
        handleSelectSuggestion,
        handleSelectSuggestion,
    ]);
};

export default useSearchTickers;
