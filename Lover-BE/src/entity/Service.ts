import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Service_provider } from "./Service_provider";
import {Provider} from "./Provider";
import {Type} from "./Type";

@Entity()

export class Service {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255, default: "user"})
    name: string;
    @ManyToOne(() => Type)
    type : Type
    @OneToMany(() => Service_provider, serviceProvider => serviceProvider.service)
    serviceProviders: Service_provider[];
}