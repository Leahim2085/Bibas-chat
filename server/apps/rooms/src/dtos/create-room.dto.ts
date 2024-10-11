import { IsString, Length } from "class-validator";

export class CreateRoomDto {
    @IsString()
    readonly owner: string;

    @IsString()
    @Length(2, 20)
    readonly name: string;
}
