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

export default function RegisterPage() {
    const { register } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/",
    });

    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    return (
        <Formik
            initialValues={{ name: '', email: '', password: '', password_confirmation: '' }}
            onSubmit={(values) => register({ ...values, setErrors })}
        >
            <Form className="flex flex-col gap-6">
                <H1>Register</H1>
                <FormRow>
                    <Label htmlFor="name">Name:</Label>
                    <Field
                        as={TextInput}
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                    />
                    {errors?.name && <InputError messages={errors.name}/>}
                </FormRow>
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
                <FormRow>
                    <Label htmlFor="password_confirmation">
                        Confirm password:
                    </Label>
                    <Field
                        as={TextInput}
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        placeholder="Re-enter your password"
                    />
                    {errors?.password_confirmation && (
                        <InputError messages={errors.password_confirmation}/>
                    )}
                </FormRow>
                <ButtonGroup>
                    <Button type="submit">Submit</Button>
                    <Button href="/login" color="secondary">
                        Log in
                    </Button>
                </ButtonGroup>
            </Form>
        </Formik>
    );
}
