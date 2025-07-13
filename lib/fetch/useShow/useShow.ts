import {useFetchResource} from "@/lib/fetch/useList/useList";
import {useMemo} from "react";

export function useShow<T extends { id: string }>(
    resource: string,
    id: string
) {
    const {
        data: listData,
        loading,
        error,
        errorMessage,
        reFetch,
    } = useFetchResource<T>(resource);

    const data = useMemo(() => {
        if (!id || !listData) return null;
        return listData.find((item) => item.id === id) || null;
    }, [id, listData]);

    return {
        data,
        loading,
        error,
        errorMessage,
        refetch: reFetch,
    };
}
