import { ApiProperty } from '@nestjs/swagger';

export class SearchResponseDto {
    @ApiProperty() uid: string;
    @ApiProperty() score: number;
    @ApiProperty() origin: string;
    @ApiProperty() title: string;
    @ApiProperty() content: string;
    @ApiProperty() created: string;
}
