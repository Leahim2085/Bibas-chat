import {Entity, Column, PrimaryColumn} from 'typeorm';
import {MessageInterface} from "@interfaces";

@Entity()
export class Room {
    @PrimaryColumn({ unique: true })
    inviteCode: string;

    @PrimaryColumn({ unique: true})
    owner: string;

    @Column()
    name: string;

    @Column("jsonb", { array: true })
    messages: MessageInterface[];
}
