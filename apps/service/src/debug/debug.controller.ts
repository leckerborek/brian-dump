import { Controller, Get } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';
import { IndexService } from 'src/index/index.service';

@Controller('debug')
export class DebugController {
    constructor(private readonly indexService: IndexService, private readonly search: SearchService) {}

    @Get()
    async generate(): Promise<void> {
        const urls = [
            'https://docs.nestjs.com/controllers',
            'https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript.html',
            'https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html',
            'https://www.npmjs.com/package/nestjs-command',
            'https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html',
            'https://www.typescriptlang.org/docs/handbook/classes.html',
            'https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript_examples.html',
            'https://t3n.de/news/desktop-goose-untitled-goose-game-1248211/',
            'https://goose.game'
        ];

        for (let url of urls) {
            await this.indexService.extract(url);
        }
    }
}
