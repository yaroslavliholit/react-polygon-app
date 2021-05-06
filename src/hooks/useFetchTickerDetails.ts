import {useCallback, useEffect, useMemo, useState} from "react";
import {polygonReferenceClient, polygonRestClient} from "../api/polygonReferenceClient";
import {ITickerDetailsFormatted} from "@polygon.io/client-js";
import {getFormatDate} from '../shared/utils/date';

const useFetchTickerDetails = (id: string) => {
    const [loading, setLoading] = useState(false);

    const [lastAvailablePrice, setLastAvailablePrice] = useState<number | null>(null);
    const [priceDifference, setPriceDifference] = useState<number | null>(null);
    const [tickerDetails, setTickerDetails] = useState<ITickerDetailsFormatted | null>(null);
    const [changePercent, setChangePercent] = useState<number | null>(null);

    const handleFetchDailyPrice = useCallback(async () => {
        try {
            const { close: currentClose } = await polygonRestClient.stocks.dailyOpenClose(id, getFormatDate(new Date(), -1));
            const { close: prevClose } = await polygonRestClient.stocks.dailyOpenClose(id, getFormatDate(new Date(), -2));

            const endOfDayClosePrice = currentClose as unknown as number;
            const prevDayClosePrice = prevClose as unknown as number;

            if (endOfDayClosePrice) {
                setLastAvailablePrice(endOfDayClosePrice);

                const priceCalculation = Number((endOfDayClosePrice - prevDayClosePrice).toFixed(1));

                setPriceDifference(priceCalculation);
                setChangePercent(Number(((priceCalculation * 100) / endOfDayClosePrice).toFixed(1)));
            }
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    const handleFetchTickerDetails = useCallback(async () => {
        setLoading(true);
        try {
          const result = await polygonReferenceClient.tickerDetails(id);
          setTickerDetails(result);
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        handleFetchTickerDetails();
        handleFetchDailyPrice();
    }, [handleFetchTickerDetails, handleFetchDailyPrice]);

    return useMemo(() => ({
        loading,
        tickerDetails,
        lastAvailablePrice,
        priceDifference,
        changePercent,
    }), [loading, tickerDetails, lastAvailablePrice, priceDifference, changePercent]);
};

export default useFetchTickerDetails;
