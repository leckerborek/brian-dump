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
    mimeType: string;
    originalname: string;
}

export type CustomContent = ContentBase & {
    // content content?!
}

export type Content = WebContent | FileContent | CustomContent;