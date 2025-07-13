import { useEffect, useState } from "react";
import { MOCKOON_URL } from "@/lib/fetch/MockoonURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFetchResource = <T>(
    resource: string,
    options?: { local?: boolean },
) => {

    const local = options?.local ?? false;
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        setErrorMessage(null);
        try {
            if (local) {
                const getData = await AsyncStorage.getItem(resource);
                const parsedData = getData ? JSON.parse(getData) : [];
                setData(parsedData);
            } else {
                const result = await fetch(`${MOCKOON_URL}/${resource}`);
                if (!result.ok) throw new Error("Could not find result");
                const dataQuery = await result.json();
                setData(dataQuery);
            }
        } catch (error) {
            setError(true);
            setErrorMessage((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [resource, local]);

    return {
        data,
        loading,
        error,
        errorMessage,
        reFetch: fetchData,
    };
};
