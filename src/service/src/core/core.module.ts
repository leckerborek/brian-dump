import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ItemsController } from 'src/items/items.controller';
import { ItemsService } from 'src/items/items.service';
import { SearchService } from 'src/search/search.service';
import { DebugController } from 'src/debug/debug.controller';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from './ElasticsearchConfigService';
import { SearchController } from 'src/search/search.controller';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService
        }),
        ConfigModule.forRoot({ isGlobal: true })
    ],
    controllers: [ ItemsController, DebugController, SearchController ],
    providers: [ ItemsService, SearchService ]
})
export class CoreModule {}
