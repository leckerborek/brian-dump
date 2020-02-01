import { Injectable } from '@nestjs/common';
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';
import { WebContent } from 'src/models/webContent';
import { SearchResult } from 'src/search/models/searchResult';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';

const indexName: string = 'brian';

@Injectable()
export class SearchService {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly configService: ConfigService
    ) {
        console.log('SearchService.configService = ' + this.configService);
    }

    async index(data: WebContent) {
        const doc: RequestParams.Index = {
            index: indexName,
            body: data
        };

        await this.elasticsearchService.index(doc);
    }

    async search(query: string): Promise<SearchResult[]> {
        const params: RequestParams.Search = {
            index: indexName,
            body: {
                query: {
                    match: {
                        content: query
                    }
                }
            }
        };

        // const result = await this.client.search(params);
        const result = await this.elasticsearchService.search(params);
        console.log(result.body.hits.hits);

        const hits = <any[]>result.body.hits.hits;
        return hits.map((hit) => {
            return {
                score: hit._score,
                url: hit._source.origin
            };
        });
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
        await this.elasticsearchService.index(doc1);

        const doc2: RequestParams.Index = {
            index: 'game-of-thrones',
            body: {
                character: 'Daenerys Targaryen',
                quote: 'I am the blood of the dragon.'
            }
        };
        await this.elasticsearchService.index(doc2);

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
        await this.elasticsearchService.index(doc3);

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

        this.elasticsearchService
            .search(params)
            .then((result: ApiResponse) => {
                console.log(result.body.hits.hits);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }
}
