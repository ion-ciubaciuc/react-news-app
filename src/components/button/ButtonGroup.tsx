import type { FC, ReactNode } from "react";

type ButtonGroupProps = { children: ReactNode };

const ButtonGroup: FC<ButtonGroupProps> = ({ children }) => {
    return <div className="flex flex-col gap-2">{children}</div>;
};

export default ButtonGroup;
