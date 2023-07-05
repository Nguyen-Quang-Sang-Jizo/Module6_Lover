import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Provider} from "./Provider";

@Entity()
export class Status{
    @PrimaryGeneratedColumn()
    id: number;
    // có 2 trang thái on , off để đăng nhập
    @Column({type: "varchar", default:"ON"})
    status: string;
}