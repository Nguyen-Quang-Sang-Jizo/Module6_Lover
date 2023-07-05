import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Provider} from "./Provider";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    address: string;
    @Column({type: "varchar", length: 255})
    hour: string;
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    startTime: Date;
    @Column({type: "varchar", length: 255})
    cost: string;
    @Column({type: "enum", enum: ["pending", "accept", "reject", "done"], default: "pending"})
    status: string;
    @ManyToOne(() => User, (user) => user.booking)
    user: User;
    @ManyToOne(() => Provider, (provider) => provider.booking)
    providers: Provider;

}