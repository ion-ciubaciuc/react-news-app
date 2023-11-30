import { FC, ReactNode } from 'react';
import { default as NextLink } from 'next/link';

type LinkProps = {
    href: string;
    children: ReactNode;
    external?: boolean;
}

const className = "underline text-blue-600 inline-block";

const Link: FC<LinkProps> = ({ children, href, external = false }) => {
    if (external) {
        return <a className={className} href={href} target="_blank">{children}</a>
    }

    return <NextLink className={className} href={href}>{children}</NextLink>
}

export default Link;
