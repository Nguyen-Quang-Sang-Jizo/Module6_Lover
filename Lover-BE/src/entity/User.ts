import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Provider } from "./Provider";
import { Booking } from "./Booking";
import { Message } from "./Message";
import { Conversation } from "./Conversation";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    username: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    firstname: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    lastname: string | null;

    @Column({ type: "varchar", length: 20, nullable: true })
    phoneNumber: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    address: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    update: string | null;

    @Column({ type: "varchar", default: "https://files.playerduo.net/production/images/avatar1.png" })
    avatar: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    email: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    numberCard: string | null;

    @Column({
        type: "varchar",
        default: "https://images2.thanhnien.vn/zoom/622_389/Uploaded/khanhtd/2022_06_08/8b63a9ff2202e25cbb13-1752.jpg"
    })
    beforeImageCard: string;

    @Column({
        type: "varchar",
        default: "https://images2.thanhnien.vn/zoom/622_389/Uploaded/khanhtd/2022_06_08/8b63a9ff2202e25cbb13-1752.jpg"
    })
    afterImageCard: string;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" }) // Tên cột liên kết tới Role
    role: Role;

    @OneToMany(() => Booking, (booking) => booking.user)
    booking: Booking[];

    @OneToMany(() => Message, (massage) => massage.sender)
    messages: Message[];
    
    @OneToMany(() => Conversation, (conversation) => conversation.user2)
    conversation:Conversation[];

    @OneToMany(() => Conversation, (conversation) => conversation.user1)
    message:Conversation[];

    @Column({ default: 0 })
    isLocked: number;
}