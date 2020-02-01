import { ShortWebContent } from "./shortWebContent";

export interface WebContent extends ShortWebContent {
    excerpt: string;
    author: string;
    length: string;
    byline: string;
    uri: string;
}
