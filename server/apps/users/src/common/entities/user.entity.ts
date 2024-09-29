import {Entity, Column, PrimaryColumn} from 'typeorm';

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

    @Column({ nullable: true })
    avatarUrl?: string;
}
