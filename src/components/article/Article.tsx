import { FC } from "react";

import { Card, Link } from "@/components";

type ArticleProps = {
    title: string;
    author: string | null;
    source: string | null;
    description: string | null;
    url: string;
    publishedAt: string;
};

const Article: FC<ArticleProps> = ({
    title,
    author,
    source,
    description,
    url,
    publishedAt,
}) => (
    <Card>
        <div className="font-semibold">{title}</div>
        <div className="italic text-sm mt-3">Author: {author ?? "Unknown"}</div>
        <div className="italic text-sm text-gray-500">Source: {source}</div>
        {description && <div className="mt-2">{description}</div>}
        <div className="mt-4">
            <Link href={url} external>
                Read more
            </Link>
        </div>
        <div className="text-xs mt-4">
            {new Date(publishedAt).toDateString()}
        </div>
    </Card>
);

export default Article;
