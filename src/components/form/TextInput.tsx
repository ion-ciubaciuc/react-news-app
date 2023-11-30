import { FC, InputHTMLAttributes } from "react";

const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
    id,
    name,
    type,
    placeholder,
    ...rest
}) => {
    return (
        <input
            {...rest}
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name={name}
            type={type || "text"}
            placeholder={placeholder}
        />
    );
};

export default TextInput;
