import cx from "classnames";
import Link from "next/link";
import type { FC, ReactNode, MouseEventHandler } from "react";

type CommonProps = {
    children: ReactNode;
    color?: "default" | "secondary";
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

type ButtonProps = CommonProps & {
    type?: HTMLButtonElement["type"];
    value?: string | number;
    isLoading?: boolean
};

type AnchorProps = CommonProps & {
    href: string;
};

const Button: FC<ButtonProps | AnchorProps> = (props) => {
    const color = props.color || "default";
    const className = cx(
        "text-center focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-8 py-2.5",
        {
            "bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700":
                color === "secondary",
            "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-30 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800":
                color === "default",
        }
    );

    if ("href" in props) {
        return (
            <Link
                className={className}
                href={props.href}
                onClick={props.onClick}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <button
            className={className}
            type={props.type || "button"}
            value={props.value}
            onClick={props.onClick}
            disabled={props.isLoading}
        >
            {props.isLoading ? "Loading..." : props.children}
        </button>
    );
};

export default Button;
