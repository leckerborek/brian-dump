import { Controller, Get, Req, Res, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateItemDto } from './item';

@Controller('items')
export class ItemsController {
    @Get()
    findAll() : string  {
    //findAll(@Req() req: Request, @Res() res: Response) {
        //console.log(req.url);
        return 'this will return everything!'
    }

    @Post()
    create(@Body() item: CreateItemDto) : CreateItemDto {
        console.table(item);
        item.id = "12345";
        return item;
    }
}
