import {useCallback, useEffect, useMemo, useState} from "react";
import {polygonReferenceClient} from "../api/polygonReferenceClient";
import {ITickerDetailsFormatted} from "@polygon.io/client-js";

const useFetchTickerDetails = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ITickerDetailsFormatted | null>(null);

    const handleFetchTickerDetails = useCallback(async () => {
        setLoading(true);
        try {
          const result = await polygonReferenceClient.tickerDetails(id);

          setData(result);
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        handleFetchTickerDetails();
    }, [handleFetchTickerDetails]);

    return useMemo(() => ({
        loading,
        data,
    }), [loading, data]);
};

export default useFetchTickerDetails;
