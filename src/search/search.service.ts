'use strict';

import { Injectable } from '@nestjs/common';
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';
import { WebContent } from 'src/models/webContent';
import { SearchResult } from 'src/models/searchResult';

const IndexName: string = 'brian';

@Injectable()
export class SearchService {
    private client = new Client({ node: 'http://localhost:9200' });

    async index(data: WebContent) {
        const doc: RequestParams.Index = {
            index: IndexName,
            body: data
        }
        await this.client.index(doc);
    }

    async search(query: string): Promise<SearchResult[]> {
        const params: RequestParams.Search = {
            index: IndexName,
            body: {
                query: {
                    match: {
                        content: query
                    }
                }
            }
        };

        const result = await this.client.search(params);
        console.log(result.body.hits.hits);

        const hits = (<any[]>result.body.hits.hits);
        return hits.map(hit => { return {
            score: hit._score,
            url: hit._source.origin }});
    }

    async example() {
        // Let's start by indexing some data
        const doc1: RequestParams.Index = {
            index: 'game-of-thrones',
            body: {
                character: 'Ned Stark',
                quote: 'Winter is coming.'
            }
        };
        await this.client.index(doc1);

        const doc2: RequestParams.Index = {
            index: 'game-of-thrones',
            body: {
                character: 'Daenerys Targaryen',
                quote: 'I am the blood of the dragon.'
            }
        };
        await this.client.index(doc2);

        const doc3: RequestParams.Index = {
            index: 'game-of-thrones',
            // here we are forcing an index refresh,
            // otherwise we will not get any result
            // in the consequent search
            refresh: 'true',
            body: {
                character: 'Tyrion Lannister',
                quote: 'A mind needs books like a sword needs a whetstone.'
            }
        };
        await this.client.index(doc3);

        // Let's search!
        const params: RequestParams.Search = {
            index: 'game-of-thrones',
            body: {
                query: {
                    match: {
                        quote: 'winter'
                    }
                }
            }
        };

        this.client
            .search(params)
            .then((result: ApiResponse) => {
                console.log(result.body.hits.hits);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }
}
