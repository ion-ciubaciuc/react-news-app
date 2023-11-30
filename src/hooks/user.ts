"use client";

import useSWR from "swr";
import { redirect } from "next/navigation";
import { useEffect, useCallback, useState } from "react";

import axios from "@/lib/axios";
import { AxiosError } from "axios";

type SetErrorsCallback = (errors: Record<string, string[]> | null) => void;

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    personal_feed_settings: null | {
        sources: string[];
    };
};

const useUser = () => {
    const {
        data,
        error,
        mutate,
    } = useSWR("/api/user", () =>
        axios
            .get<{ data: User }>("/api/user")
            .then(({ data }) => data)
            .catch((error) => {
                throw error;
            })
    );

    return { user: data?.data, error, mutate };
};

type AuthHookProps = {
    middleware?: string;
    redirectIfAuthenticated?: string;
};

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: AuthHookProps = {}) => {
    const { user, error, mutate } = useUser();

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    type RegisterProps = {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        setErrors: SetErrorsCallback;
    };

    const register = async ({
        name,
        email,
        password,
        password_confirmation,
        setErrors,
    }: RegisterProps) => {
        await csrf();

        setErrors(null);

        axios
            .post("/register", {
                name,
                email,
                password,
                password_confirmation,
            })
            .then(() => mutate())
            .catch((error) => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
    };

    type LoginProps = {
        email: string;
        password: string;
        setErrors: SetErrorsCallback;
    };

    const login = async ({ email, password, setErrors }: LoginProps) => {
        await csrf();

        setErrors(null);

        axios
            .post("/login", { email, password })
            .then(() => mutate())
            .catch((error) => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
    };

    const logout = useCallback(async () => {
        if (!error) {
            await axios.post("/logout").then(() => mutate());
        }

        window.location.pathname = "/";
    }, [error, mutate]);

    useEffect(() => {
        if (middleware === "guest" && redirectIfAuthenticated && user)
            redirect(redirectIfAuthenticated);
        if (middleware === "auth" && error) logout();
    }, [user, error, middleware, redirectIfAuthenticated, logout]);

    return {
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
    };
};

type Settings = { sources: string[] }

export const useUpdateUserSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const mutate = (settings: Settings) => {
        setIsLoading(true);
        setError(null);

        return axios
            .patch(`/api/user/settings`, settings)
            .catch(setError)
            .finally(() => setIsLoading(false));
    };

    return { mutate, isLoading, error };
};
