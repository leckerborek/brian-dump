import { Injectable } from '@nestjs/common';
// import * as request from 'request';
import * as request from 'request-promise-native';
import * as readability from 'readability-node';
import * as jsdom from 'jsdom';
import { WebContent } from './items/webContent';

@Injectable()
export class ItemsService {
	async extract(url: string): Promise<WebContent> {
        // Maybe try this axios thing... :shrug:
		let body = await request.get(url);
		console.log('body', body);

		let doc = jsdom.jsdom(body, {
			features: {
				FetchExternalResources: false,
				ProcessExternalResources: false
			}
		});

		console.log('doc', doc);

		const Readability = readability.Readability;
		var article = new Readability({}, doc).parse();

		console.log('article', article);

		return {
			title: article.title,
			excerpt: article.excerpt,
			author: article.byline,
			content: article.content,
			length: article.length,
			byline: article.byline,
			uri: article.uri
		};
	}
}
