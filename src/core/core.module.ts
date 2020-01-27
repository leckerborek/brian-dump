import { Module } from '@nestjs/common';
import { ItemsController } from 'src/items/items.controller';
import { ItemsService } from 'src/items.service';

@Module({ 
    controllers: [ItemsController],
    providers: [ItemsService],})
export class CoreModule {}
