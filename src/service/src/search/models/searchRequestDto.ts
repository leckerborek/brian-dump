import { ApiProperty } from '@nestjs/swagger';

export class SearchRequestDto {
    @ApiProperty() query: string;
}
