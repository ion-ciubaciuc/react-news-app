import type { FC, ReactNode } from "react";

type CardProps = { children: ReactNode };

const Card: FC<CardProps> = ({ children }: CardProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg">
            {children}
        </div>
    );
};

export default Card;
