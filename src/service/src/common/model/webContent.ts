import { ContentBase } from "./contentBase";

export type WebContent = ContentBase & {
    excerpt: string;
    author: string;
    length: string;
    byline: string;
    lang: string;
}

export type FileContent = ContentBase & {
    blob: string;
}

export type Content = WebContent | FileContent;