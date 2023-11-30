import type { AxiosError } from "axios";
import { useEffect, useState } from "react";

import axios from "@/lib/axios";

type Article = {
    title: string;
    description: string | null;
    url: string;
    author: string | null;
    source: string | null;
    publishedAt: string;
};

type SearchParams = { [key: string]: string | string[] | undefined };

export const useArticles = (
    searchParams: SearchParams,
    enable: boolean = true
) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isFetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const { page, query, date_from, date_to, sources } = searchParams;

    useEffect(() => {
        const fetchData = () => {
            if (!enable) {
                // Skip fetching if enable is false
                setLoading(false);
                return;
            }

            setFetching(true);

            axios
                .get<Article[]>("/api/home", {
                    params: { page, query, sources, date_from, date_to, },
                })
                .then((response) => setArticles(response.data))
                .catch((error) => setError(error))
                .finally(() => {
                    setFetching(false);
                    setLoading(false);
                });
        };

        fetchData();
    }, [page, query, sources, date_from, date_to, enable]);

    return { articles, isLoading, isFetching, error };
};
