import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import {MessagePattern} from "@nestjs/microservices";
import {CreateRoomDto} from "./dtos";

@Controller()
export class RoomsController {
  roomsService: RoomsService;

  constructor(roomsService: RoomsService) {
    this.roomsService = roomsService;
  }

  @MessagePattern({ cmd: "create" })
  create({ room }: { room: CreateRoomDto }) {
    return this.roomsService.create(room);
  }
}
