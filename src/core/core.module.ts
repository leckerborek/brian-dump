import { Module } from '@nestjs/common';
import { ItemsController } from 'src/items/items.controller';
import { ItemsService } from 'src/items/items.service';
import { SearchService } from 'src/search/search.service';
import { DebugController } from 'src/debug/debug.controller';

@Module({ 
    controllers: [ItemsController, DebugController],
    providers: [ItemsService, SearchService],})
export class CoreModule {}
