import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { SearchService } from 'src/search/search.service';
import { DebugController } from 'src/debug/debug.controller';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchController } from 'src/search/search.controller';
import { IndexService } from 'src/index/index.service';
import { IndexController } from 'src/index/index.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                node: configService.get<string>('ELASTICSEARCH_NODE')
            }),
            imports: [ ConfigModule ],
            inject: [ ConfigService ]
        }),
        MulterModule.registerAsync({
            useFactory: (ConfigService: ConfigService) => ({
                dest: ConfigService.get<string>('UPLOAD_DESTINATION'),
                limits: {
                    fileSize: 1024 * 1024 // bytes
                }
            }),
            imports: [ ConfigModule ],
            inject: [ ConfigService ]
        }),
        ConfigModule.forRoot({ isGlobal: true })
    ],
    controllers: [ DebugController, SearchController, IndexController ],
    providers: [ SearchService, IndexService ]
})

export class CoreModule {}
