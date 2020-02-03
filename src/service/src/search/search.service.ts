import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';
import { WebContent } from 'src/common/model/webContent';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { Guid } from 'guid-typescript';
import { SearchModel } from 'src/common/model/searchModel';
import { SearchResultBase } from 'src/common/model/searchResultBase';

type CreateIndexResponse = {
    acknowledged: boolean;
    shards_acknowledged: boolean;
    index: string
};

@Injectable()
export class SearchService implements OnApplicationBootstrap {

    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly configService: ConfigService
    ) {
        this.indexName = configService.get<string>('ELASTICSEARCH_INDEX');
        Logger.log(`Using ES index '${this.indexName}'`);
    }

    private indexName: string;
    
    async onApplicationBootstrap(): Promise<void> {
        await this.prepareIndex();
    }

    private async prepareIndex(): Promise<void> 
    {
        if (this.configService.get<boolean>('ELASTICSEARCH_DROP_INDEX')) {
            Logger.warn('Elasticsearch index will be dropped.')
            const { body: deleteBody } = await this.elasticsearchService.indices.delete({index: this.indexName});
            Logger.log(deleteBody);
        }

        const { body: exists, statusCode, headers, warnings, meta } = await this.elasticsearchService.indices.exists({
            index: this.indexName
        });

        if (!exists) {
            Logger.warn('Index does not exist, trying to create one.');
            const { body, statusCode, headers, warnings } = await this.elasticsearchService.indices.create({
                index: this.indexName,
                body: {
                    mappings: {
                        properties: {
                            uid: { type: 'keyword' },
                            created: { type: 'date' },
                            origin: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword'
                                    }
                                }
                            }
                        }
                    }
                }
            });

            Logger.log(body);
        }
    }

    async index(content: WebContent) {
        const searchModel: SearchModel = {
            ...content,
            uid: Guid.raw(),
            created: new Date().toISOString()
        };

        const exists = await this.exists(content.origin);
        Logger.log(`exists = ${exists}`);

        if (exists) {
            Logger.warn(`Item with origin '${content.origin}' already exists.`);
            return;
        }

        Logger.debug(searchModel);

        const document: RequestParams.Index = {
            index: this.indexName,
            body: searchModel
        };

        await this.elasticsearchService.index(document);
    }

    async search(query: string): Promise<SearchResultBase[]> {
        const params: RequestParams.Search = {
            index: this.indexName,
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
        //console.log(result.body.hits.hits);

        const hits = <any[]>result.body.hits.hits;
        return hits.map((hit) => {
            return {
                uid: hit._source.uid,
                origin: hit._source.origin,
                score: hit._score,
                title: hit._source.title,
                content: hit._source.excerpt,
                created: hit._source.created
            };
        });
    }

    async exists(origin: string) {
        const params: RequestParams.Search = {
            index: this.indexName,
            body: {
                query: {
                    term: {
                        'origin.raw': {
                            value: origin
                        }
                    }
                }
            }
        };

        const { body } = await this.elasticsearchService.count(params);
        return body.count > 0;
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
                Logger.log(result.body.hits.hits);
            })
            .catch((err: Error) => {
                Logger.error(err);
            });
    }
}
