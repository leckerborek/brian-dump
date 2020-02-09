import { SearchModel } from "./searchModel";

export type SearchResultModel = SearchModel & {
    score: number;
}