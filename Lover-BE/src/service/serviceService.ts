import {AppDataSource} from "../ormconfig";
import {Service} from "../entity/Service";

class ServiceService {
    private serviceRepository

    constructor() {
        this.serviceRepository = AppDataSource.getRepository(Service)
    }
    all = async () => {
        return await this.serviceRepository.find()
    }
    getByIdService = async (idType) => {
        const service = await this.serviceRepository.find(
            {
                where: {
                    type: {
                        id :idType
                    }
                },
                relations: ['type'],
            }
        );
        return service;
    }
    basic = async () => {
        return await this.serviceRepository.find({
            relations: {
                type: true
            },
            where: {
                type: {
                    id: 1
                }
            }
        })
    }
    free = async () => {
        return await this.serviceRepository.find({
            relations: {
                type: true
            },
            where: {
                type: {
                    id: 2
                }
            }
        })
    }
    more = async () => {
        return await this.serviceRepository.find({
            relations: {
                type: true
            },
            where: {
                type: {
                    id: 3
                }
            }
        })
    }
}

export default new ServiceService();

