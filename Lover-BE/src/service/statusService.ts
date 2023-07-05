import {AppDataSource} from "../ormconfig";
import {Status} from "../entity/Status";
import {Provider} from "../entity/Provider";
import {id} from "date-fns/locale";

class StatusService{
    private providerRepository
    private statusRepository
    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
        this.statusRepository = AppDataSource.getRepository(Status)
    }

    On = async (id) => {
        let on = await this.statusRepository.findOneBy({id: 1})
        await this.providerRepository.update({id : id}, {status: on})
    }
    Off = async (id) => {
        let off = await this.statusRepository.findOneBy({id: 2})
        await this.providerRepository.update({id : id}, {status: off})
    }
}

export default new StatusService()