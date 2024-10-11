import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Room, User} from "@entities";
import {Repository} from "typeorm";
import {CreateRoomDto} from "./dtos";
import {Exceptions} from "@exceptions";
import { v4 as uuid } from "uuid";

@Injectable()
export class RoomsService {
  constructor(
      @InjectRepository(User) private usersRepository: Repository<User>,
      @InjectRepository(Room) private roomsRepository: Repository<Room>,
  ) {}

  public async create(room: CreateRoomDto) {
    const checkOwner = await this.usersRepository.findOne({
      where: {
        id: room.owner,
      }
    });

    if(!checkOwner) {
      throw Exceptions.UserNotFound();
    } if(checkOwner?.rooms?.length >= 5) {
      throw Exceptions.UserUsedAllRooms();
    }

    const newRoom = new Room();
    const newRoomId = uuid();

    newRoom.id = newRoomId;
    newRoom.name = room.name;
    newRoom.owner = room.owner;
    newRoom.users = [room.owner];

    await this.usersRepository.update({id: room.owner}, {rooms: [...checkOwner.rooms, newRoomId]});
    return await this.roomsRepository.save(newRoom);
  }
}
