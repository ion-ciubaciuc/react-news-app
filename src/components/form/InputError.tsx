import type { FC } from "react";

type InputErrorProps = {
    messages: string[];
};

const InputError: FC<InputErrorProps> = ({ messages = [] }) => (
    <>
        {messages.map((message, index) => (
            <p className="text-sm text-red-600" key={index}>
                {message}
            </p>
        ))}
    </>
);

export default InputError;
