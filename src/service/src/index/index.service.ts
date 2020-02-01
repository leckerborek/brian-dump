import { Injectable, Logger } from '@nestjs/common';
import * as request from 'request-promise-native';
import * as readability from 'readability-node';
import * as jsdom from 'jsdom';
import { SearchService } from 'src/search/search.service';

const Verbose: boolean = false;

@Injectable()
export class IndexService {
    constructor(private readonly searchService: SearchService) {}

    async extract(url: string): Promise<boolean> {
        Logger.log(`Starting extraction from '${url}'`);
        try {
            // Maybe try this axios thing... :shrug:
            let body = await request.get(url);

            //if (Verbose) Logger.debug('body', body);

            let doc = jsdom.jsdom(body, {
                features: {
                    FetchExternalResources: false,
                    ProcessExternalResources: false
                }
            });

            const Readability = readability.Readability;
            var article = new Readability({}, doc).parse();

            if (article == null) {
                throw new Error('Readability could not parse url.');
            }

            //if (Verbose) Logger.debug('article', article);

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

            //if (Verbose) Logger.debug('webContent', webContent);

            this.searchService.index(webContent);

            return true;
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }
}
