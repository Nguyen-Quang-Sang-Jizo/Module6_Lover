import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Provider } from "./Provider";
import { User } from "./User";

@Entity('otps')
export class Evaluate {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
    id: string;
    @Column({ length: 1, nullable: true })
    star: string;
    @Column({type: "varchar", length: 255, nullable: true})
    comment: string;
    @ManyToOne(()=> Provider, (provider)=> provider.evaluate)
    provider: Provider;
    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}