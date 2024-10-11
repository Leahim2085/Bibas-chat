import {Entity, Column, PrimaryColumn} from 'typeorm';
import {MessageInterface} from "@interfaces";

@Entity()
export class Room {
    @PrimaryColumn({ unique: true })
    id: string;

    @PrimaryColumn({ unique: true})
    owner: string;

    @Column()
    name: string;

    @Column("jsonb", { array: true, nullable: true })
    messages?: MessageInterface[];

    @Column("simple-array")
    users: string[];
}
