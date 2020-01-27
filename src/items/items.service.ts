import { Injectable } from '@nestjs/common';
// import * as request from 'request';
import * as request from 'request-promise-native';
import * as readability from 'readability-node';
import * as jsdom from 'jsdom';
import { WebContent } from '../models/webContent';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class ItemsService {
    constructor(private readonly searchService: SearchService) {}

    async extract(url: string): Promise<WebContent> {
        console.log('url', url);
        try {
            // Maybe try this axios thing... :shrug:
            let body = await request.get(url);
            //console.log('body', body);

            let doc = jsdom.jsdom(body, {
                features: {
                    FetchExternalResources: false,
                    ProcessExternalResources: false
                }
            });

            //console.log('doc', doc);

            const Readability = readability.Readability;
            var article = new Readability({}, doc).parse();

            if (article == null) {
                throw new Error('Readability could not parse url.');
            }
            //console.log('article', article);

            const webContent = {
                origin: url,
                title: article.title,
                excerpt: article.excerpt,
                author: article.byline,
                content: article.content,
                length: article.length,
                byline: article.byline,
                uri: article.uri
            };
            //console.log("webContent", webContent);

            this.searchService.index(webContent);
            return webContent;
        } catch (error) {
            console.error(error);
        }
    }
}
