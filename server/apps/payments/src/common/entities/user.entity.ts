import {Entity, Column, PrimaryColumn} from 'typeorm';
import {DeviceInterface} from "@interfaces";

@Entity()
export class User {
    @PrimaryColumn({ unique: true })
    id: string;

    @PrimaryColumn({ unique: true})
    userName: string;

    @PrimaryColumn({ unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    isActivatedEmail: boolean;

    @PrimaryColumn({ unique: true })
    avatarUrl: string;

    @Column("jsonb", { array: true })
    devices: DeviceInterface[];
}
