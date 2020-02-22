import { ApiProperty } from '@nestjs/swagger';

export class IndexContentRequestDto {
    @ApiProperty() title: string;
    @ApiProperty() content: string;
}
