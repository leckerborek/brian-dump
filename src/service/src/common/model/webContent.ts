import { ContentBase } from "./contentBase";

export type WebContent = ContentBase & {
    excerpt: string;
    author: string;
    length: string;
    byline: string;
}
