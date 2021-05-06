import {useCallback, useEffect, useMemo, useState} from "react";
import {polygonReferenceClient, polygonRestClient} from "../api/polygonReferenceClient";
import {ITickerDetailsFormatted} from "@polygon.io/client-js";
import {getFormatDate} from '../shared/utils/date';

const useFetchTickerDetails = (id: string) => {
    const [networkError, setNetworkError] = useState(false);
    const [tickerDetails, setTickerDetails] = useState<Nullable<ITickerDetailsFormatted>>(null);
    const [tickerDetailsLoading, setTickerDetailsLoading] = useState(false);
    const [lastAvailablePrice, setLastAvailablePrice] = useState<Nullable<number>>(null);
    const [priceDifference, setPriceDifference] = useState<Nullable<number>>(null);
    const [changePercent, setChangePercent] = useState<Nullable<number>>(null);
    const [aggregatesBars, setAggregatesBars] = useState<AggregatesBar[]>([]);
    const [stocksDetailsLoading, setStocksDetailsLoading] = useState(false);

    const isAnyLoading = tickerDetailsLoading || stocksDetailsLoading;

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
            setNetworkError(true);
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

                const priceCalculation = Number((endOfDayClosePrice - prevDayClosePrice).toFixed(1));

                setPriceDifference(priceCalculation);
                setChangePercent(Number(((priceCalculation * 100) / endOfDayClosePrice).toFixed(1)));
            }
        } catch (e) {
            setNetworkError(true);
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
            setNetworkError(true);
            console.error(e)
        } finally {
            setTickerDetailsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        handleFetchTickerDetails();
        handleFetchDailyPrice();
        handleFetchAggregatesBars();
    }, [handleFetchTickerDetails, handleFetchDailyPrice, handleFetchAggregatesBars]);

    return useMemo(() => ({
        networkError,
        isAnyLoading,
        aggregatesBars,
        tickerDetails,
        lastAvailablePrice,
        priceDifference,
        changePercent,
    }), [
        networkError,
        isAnyLoading,
        aggregatesBars,
        tickerDetails,
        lastAvailablePrice,
        priceDifference,
        changePercent
    ]);
};

export default useFetchTickerDetails;
