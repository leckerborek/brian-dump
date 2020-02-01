import { ElasticsearchOptionsFactory, ElasticsearchModuleOptions } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';

export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createElasticsearchOptions(): ElasticsearchModuleOptions {
        console.log('ElasticsearchConfigService.configService = ' + this.configService);
        return {
            node: 'http://localhost:9200'
        };
    }
}
