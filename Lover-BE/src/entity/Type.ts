import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Type{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar"})
    type: string;
}