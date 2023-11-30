import type { FC, ReactNode } from "react";

type FormRowProps = { children: ReactNode };

const FormRow: FC<FormRowProps> = ({ children }) => {
    return <div className="space-y-2 grow">{children}</div>;
};

export default FormRow;
