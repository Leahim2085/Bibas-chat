import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {CreateRoomDto} from "./dtos";

@Injectable()
export class RoomsService {
    constructor(
        @Inject("ROOMS_SERVICE") private readonly roomsClient: ClientProxy,
    ) {}

    async create(room: CreateRoomDto) {
        return this.roomsClient.send({ cmd: "create" }, { room });
    }
}
