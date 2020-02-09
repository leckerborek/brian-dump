import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ApiResponse, RequestParams } from '@elastic/elasticsearch';
import { Content } from 'src/common/model/webContent';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { Guid } from 'guid-typescript';
import { SearchModel } from 'src/common/model/searchModel';
import { SearchResultBase } from 'src/common/model/searchResultBase';
import * as franc from 'franc';

@Injectable()
export class SearchService implements OnApplicationBootstrap {
    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly configService: ConfigService
    ) {
        this.indexName = configService.get<string>('ELASTICSEARCH_INDEX');
    }

    private indexName: string;

    async onApplicationBootstrap(): Promise<void> {
        await this.prepareIndex();
    }

    private async prepareIndex(): Promise<void> {
        Logger.log(`Using Elasticsearch index '${this.indexName}'`);

        if (this.configService.get<boolean>('ELASTICSEARCH_DROP_INDEX')) {
            Logger.warn('Index will be dropped.');
            const { body: deleteBody } = await this.elasticsearchService.indices.delete({ index: this.indexName });
            Logger.log(deleteBody);
        }

        const { body: exists } = await this.elasticsearchService.indices.exists({
            index: this.indexName
        });

        if (exists) {
            Logger.log('Index already exists.');
        } else {
            Logger.warn('Index does not exist, trying to create new.');
            const { body } = await this.elasticsearchService.indices.create({
                index: this.indexName,
                body: {
                    mappings: {
                        properties: {
                            uid: { type: 'keyword' },
                            created: { type: 'date' },
                            lang: { type: 'keyword' },
                            origin: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword'
                                    }
                                }
                            },
                            blob: { type: 'binary' },
                            content: { type: 'text' }
                        }
                    }
                }
            });
            Logger.log(body);
        }
    }

    async index(content: Content) {
        const exists: boolean = (content.origin) ? await this.exists(content.origin) : false;
        if (exists) {
            Logger.warn(`Item with origin '${content.origin}' already exists.`);
            return;
        }

        const meta = {
            uid: Guid.raw(),
            lang: franc(content.content),
            created: new Date().toISOString()
        };

        const searchModel: SearchModel = {
            ...content,
            ...meta
        };

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
}
