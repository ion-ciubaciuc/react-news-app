import cx from "classnames";
import type { FC, ReactNode, JSX } from "react";

type CommonProps = {
    children: ReactNode;
};

type HeadingProps = CommonProps & {
    level: 1 | 2 | 3;
};

const Heading: FC<HeadingProps> = ({ level, children }) => {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    const className = cx("font-semibold", {
        "text-2xl": level === 1,
        "text-xl": level === 2,
        "text-lg": level === 3,
    });

    return <HeadingTag className={className}>{children}</HeadingTag>;
};

export default Heading;

export const H1: FC<CommonProps> = ({ children }) => (
    <Heading level={1}>{children}</Heading>
);

export const H2: FC<CommonProps> = ({ children }) => (
    <Heading level={2}>{children}</Heading>
);

export const H3: FC<CommonProps> = ({ children }) => (
    <Heading level={3}>{children}</Heading>
);
