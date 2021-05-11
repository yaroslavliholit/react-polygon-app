import {useCallback, useEffect, useMemo, useState} from "react";
import {ITickerDetailsFormatted} from "@polygon.io/client-js";

import {getFormatDate} from '../utils/date';
import {polygonReferenceClient, polygonRestClient} from "../../api/polygonReferenceClient";

const useFetchTickerDetails = (id: string) => {
    // ****** DATA START ******
    const [tickerDetails, setTickerDetails] = useState<Nullable<ITickerDetailsFormatted>>(null);
    const [tickerDetailsLoading, setTickerDetailsLoading] = useState(false);
    const [lastAvailablePrice, setLastAvailablePrice] = useState<Nullable<number>>(null);
    const [priceDifference, setPriceDifference] = useState<Nullable<number>>(null);
    const [changePercent, setChangePercent] = useState<Nullable<number>>(null);
    const [aggregatesBars, setAggregatesBars] = useState<AggregatesBar[]>([]);
    const [stocksDetailsLoading, setStocksDetailsLoading] = useState(false);

    const [aggregatesBarsNetworkError, setAggregatesBarsNetworkError] = useState(false);
    const [dailyPriceNetworkError, setDailyPriceNetworkError] = useState(false);
    const [tickerDetailsNetworkError, setTickerDetailsNetworkError] = useState(false);

    const isAnyLoading = tickerDetailsLoading || stocksDetailsLoading;
    // ****** DATA END ******

    // ****** CALLBACKS START ******
    const handleFetchAggregatesBars = useCallback(async () => {
        try {
          const currentMouth = getFormatDate({ date: new Date() });
          const prevMouth = getFormatDate({ date: new Date(), extraMonth: -1 });

          const { results } = await polygonRestClient.stocks.aggregates(
              id, 1, 'day', prevMouth, currentMouth
          );

          const formatterResult = results.map(e => ({
              value: e.c
          }));

        setAggregatesBars(formatterResult);
        } catch (e) {
            setAggregatesBarsNetworkError(true);
            console.error(e)
        }
    }, [id]);

    const handleFetchDailyPrice = useCallback(async () => {
        setStocksDetailsLoading(true);
        try {
            const { close: currentClose } = await polygonRestClient.stocks.dailyOpenClose(
                id, getFormatDate({ date: new Date(), extraDay:  -1 })
            );

            const { close: prevClose } = await polygonRestClient.stocks.dailyOpenClose(
                id, getFormatDate({ date: new Date(), extraDay:  -2 })
            );

            const endOfDayClosePrice = currentClose as unknown as number;
            const prevDayClosePrice = prevClose as unknown as number;

            if (endOfDayClosePrice) {
                setLastAvailablePrice(endOfDayClosePrice);

                const priceChangeDifference = Number((endOfDayClosePrice - prevDayClosePrice).toFixed(1));
                const priceChangeDifferencePercent = Number(
                  ((priceChangeDifference * 100) / endOfDayClosePrice).toFixed(1)
                );

                setPriceDifference(priceChangeDifference);
                setChangePercent(priceChangeDifferencePercent);
            }
        } catch (e) {
            setDailyPriceNetworkError(true);
            console.error(e);
        } finally {
            setStocksDetailsLoading(false);
        }
    }, [id]);

    const handleFetchTickerDetails = useCallback(async () => {
        setTickerDetailsLoading(true);
        try {
          const result = await polygonReferenceClient.tickerDetails(id);
          setTickerDetails(result);
        } catch (e) {
            setTickerDetailsNetworkError(true);
            console.error(e)
        } finally {
            setTickerDetailsLoading(false);
        }
    }, [id]);
    // ****** CALLBACKS END ******

    // ****** EFFECTS START ******
    useEffect(() => {
        handleFetchTickerDetails();
        handleFetchDailyPrice();
        handleFetchAggregatesBars();
    }, [handleFetchTickerDetails, handleFetchDailyPrice, handleFetchAggregatesBars]);
    // ****** EFFECTS END ******

    return useMemo(() => ({
        aggregatesBarsNetworkError,
        dailyPriceNetworkError,
        tickerDetailsNetworkError,
        isAnyLoading,
        aggregatesBars,
        tickerDetails,
        lastAvailablePrice,
        priceDifference,
        changePercent,
    }), [
        aggregatesBarsNetworkError,
        dailyPriceNetworkError,
        tickerDetailsNetworkError,
        isAnyLoading,
        aggregatesBars,
        tickerDetails,
        lastAvailablePrice,
        priceDifference,
        changePercent,
    ]);
};

export default useFetchTickerDetails;
