import {AppDataSource} from "../ormconfig";
import {Type} from "../entity/Type";

class TypeService {
    private typeRepository
    constructor() {
        this.typeRepository = AppDataSource.getRepository(Type)
    }

    getAllType = async () => {
        return await this.typeRepository.find()
    }
}

export default new TypeService();