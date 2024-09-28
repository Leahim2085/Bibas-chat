import {Column, PrimaryColumn} from "typeorm";

export class DeviceInterface {
    @Column()
    refresh: string;

    @Column()
    platform: string;

    @PrimaryColumn({ unique: true })
    id: string;

    @Column()
    ip: string;
}