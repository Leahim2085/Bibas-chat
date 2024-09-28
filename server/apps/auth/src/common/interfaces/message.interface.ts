import {Column, PrimaryColumn} from "typeorm";

export class MessageInterface {
    @Column()
    text: string;

    @PrimaryColumn({ unique: true })
    from: string;
}