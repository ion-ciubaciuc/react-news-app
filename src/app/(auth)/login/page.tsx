"use client";

import { useState } from "react";
import { Form, Formik, Field } from "formik";

import { useAuth } from "@/hooks/user";
import {
    Button,
    ButtonGroup,
    FormRow,
    H1,
    InputError,
    Label,
    TextInput,
} from "@/components";

export default function LoginPage() {
    const { login } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/",
    });

    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => login({ ...values, setErrors })}
        >
            <Form className="flex flex-col gap-6">
                <H1>Log in</H1>
                <FormRow>
                    <Label htmlFor="email">Email:</Label>
                    <Field
                        as={TextInput}
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                    {errors?.email && <InputError messages={errors.email}/>}
                </FormRow>
                <FormRow>
                    <Label htmlFor="password">Password:</Label>
                    <Field
                        as={TextInput}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    {errors?.password && <InputError messages={errors.password}/>}
                </FormRow>
                <ButtonGroup>
                    <Button type="submit">Submit</Button>
                    <Button href="/register" color="secondary">
                        Register
                    </Button>
                </ButtonGroup>
            </Form>
        </Formik>
    );
}
