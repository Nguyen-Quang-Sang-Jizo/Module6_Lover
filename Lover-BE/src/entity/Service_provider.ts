import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Type} from "./Type";
import Server from "mysql2/typings/mysql/lib/Server";
import {Service} from "./Service";
import {Provider} from "./Provider";

@Entity()
export class Service_provider{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Service, service => service.serviceProviders)
  service: Service;
    @ManyToOne(() => Provider, provider=>provider.serviceProviders)
    provider : Provider
}