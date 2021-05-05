import {useCallback, useEffect, useMemo, useState} from "react";
import {ITickers} from "@polygon.io/client-js";
import polygonReferenceClient from '../api/polygonReferenceClient';
import { useHistory } from 'react-router-dom';
import ROUTES_PATHS from "../app/routes/paths";

const useSearchTickers = () => {
    // ****** DATA START ******
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<ITickers[]>([]);
    // ****** DATA END ******

    // ****** CALLBACKS START ******
    const handleChangeValue = useCallback((e) => {
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
        history.push(ROUTES_PATHS.symbolDetails(ticker))
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
        handleChangeValue,
        handleSelectSuggestion,
    }), [
        suggestions,
        searchQuery,
        handleChangeValue,
        handleSelectSuggestion,
    ]);
};

export default useSearchTickers;
