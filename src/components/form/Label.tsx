import { FC, ReactNode } from "react";

type LabelProps = {
    children: ReactNode;
    htmlFor: string;
};

const Label: FC<LabelProps> = ({ children, htmlFor }) => {
    return (
        <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium">
            {children}
        </label>
    );
};

export default Label;
