import { useState } from "react";
import { MOCKOON_URL } from "@/lib/fetch/MockoonURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCreate = (resource: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any | null>(null);

    const state = async (
        { value, local = false }: { value: any; local?: boolean }
    ) => {
        setLoading(true);
        setError(null);
        setData(null);
        try {
            if (local) {
                const existingData = await AsyncStorage.getItem(resource);
                const parsedData = existingData ? JSON.parse(existingData) : [];
                const newData = [...parsedData, value];
                await AsyncStorage.setItem(resource, JSON.stringify(newData));
                setData(value);
                return value;
            } else {
                const response = await fetch(`${MOCKOON_URL}/${resource}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(value),
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch resource "${response.status}"`);
                }

                const result = await response.json();
                setData(result);
                return result;
            }
        } catch (er) {
            console.error(er);
            setError((er as Error).message);
            throw er;
        } finally {
            setLoading(false);
        }
    };

    return {
        state,
        loading,
        error,
        data,
    };
};
