import { WebContent } from "./webContent";

export type SearchModel = WebContent & {
    uid: string;
    created: string;
}