import {Body, Controller, Post,} from "@nestjs/common";
import {RoomsService} from "./rooms.service";
import {CreateRoomDto} from "./dtos";

@Controller("rooms")
export class RoomsController {
    roomsService: RoomsService;

    constructor(roomsService: RoomsService) {
        this.roomsService = roomsService;
    }

    @Post("/create")
    async create(
        @Body() room: CreateRoomDto,
    ) {
       return await this.roomsService.create(room);
    }
}
