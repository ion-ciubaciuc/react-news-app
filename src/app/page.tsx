"use client";

import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";

import { useArticles } from "@/hooks/article";
import { newsSources } from "@/lib/constants";
import { useAuth, useUpdateUserSettings } from "@/hooks/user";
import { Article, Button, ButtonGroup, Card, FormRow, Header, Label, TextInput } from "@/components";

type QueryParameters = {
    query: string,
    sources: string[],
    date_from: string,
    date_to: string,
};

export default function Home() {
    const { user } = useAuth();
    const { mutate: updateSettings } = useUpdateUserSettings();
    const [queryParams, setQueryParams] = useState<QueryParameters>({
        sources: newsSources.map(({ value }) => value),
    } as QueryParameters);
    const { isLoading, isFetching, articles } = useArticles(queryParams);
    const formRef = useRef<HTMLFormElement | null>(null);
    const formValues = {
        ...queryParams,
        sources: user?.personal_feed_settings?.sources ?? queryParams.sources
    }

    return (
        <>
            <Header/>
            <main className="min-h-screen px-4 py-12">
                <div className="max-w-4xl w-full mx-auto space-y-12">
                    <Card>
                        <Formik
                            enableReinitialize
                            initialValues={formValues}
                            onSubmit={(values) => setQueryParams(values)}
                        >
                            <Form
                                className="flex flex-col gap-6"
                                action="/"
                                method="GET"
                                ref={formRef}
                            >
                                <FormRow>
                                    <Label htmlFor="query">Keywords</Label>
                                    <Field id="query" name="query" as={TextInput}/>
                                </FormRow>
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <FormRow>
                                        <Label htmlFor="date-from">Date from:</Label>
                                        <Field
                                            id="date-from"
                                            name="date_from"
                                            type="date"
                                            as={TextInput}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <Label htmlFor="date-to">Date to:</Label>
                                        <Field
                                            id="date-to"
                                            name="date_to"
                                            type="date"
                                            as={TextInput}
                                        />
                                    </FormRow>
                                </div>
                                <FormRow>
                                    <Label htmlFor="sources">News Sources</Label>
                                    <Field
                                        as="select"
                                        id="sources"
                                        name="sources"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        multiple
                                    >
                                        {newsSources.map(({ value, label }) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </Field>
                                </FormRow>
                                <ButtonGroup>
                                    <Button type="submit" isLoading={isFetching}>
                                        Search
                                    </Button>
                                    {user &&
                                        <Button
                                            color="secondary"
                                            onClick={() => {
                                                const data = new FormData(formRef.current as HTMLFormElement);
                                                updateSettings({ sources: data.getAll('sources') as string[] })}
                                            }
                                        >
                                            Save sources
                                        </Button>
                                    }
                                </ButtonGroup>
                            </Form>
                        </Formik>
                    </Card>
                    <div className="space-y-6">
                        {isLoading ? "Loading..." : undefined}
                        {articles.map((article, i) => (
                            <Article {...article} key={i}/>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
