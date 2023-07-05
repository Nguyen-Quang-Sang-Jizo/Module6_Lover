import ServiceProviderRouter from "../router/serviceProviderRouter";
import {AppDataSource} from "../ormconfig"
import {Service_provider} from "../entity/Service_provider";
import {Service} from "../entity/Service";
import {Provider} from "../entity/Provider";
import {ProviderListPaginated, ProviderPaginate} from "../lib/provider-paginate";
import {PageMeta} from "../lib/paginate";

class ServiceProviderService {
    private serviceProviderRepository
    private providerRepository
    private serviceRepository

    constructor() {
        this.serviceProviderRepository = AppDataSource.getRepository(Service_provider)
        this.providerRepository = AppDataSource.getRepository(Provider)
        this.serviceRepository = AppDataSource.getRepository(Service)
    }

    all = async (typeId, q) => {
        const sql = this.serviceProviderRepository
            .createQueryBuilder("sp")
            .leftJoinAndSelect("sp.service", "s")
            .leftJoinAndSelect("sp.provider", "p")
            .where("s.id = :typeId", {typeId})
            .leftJoinAndSelect("p.user", "u")
            .leftJoinAndSelect("p.status", "status")
            .leftJoinAndSelect("p.images", "images")
            .leftJoinAndSelect("p.evaluate", "evaluate")
            .leftJoinAndSelect("s.type", "type")
            .take(q.take ? q.take : 15)
            .skip((q.page - 1) * q.take);

        if (q.keyword) {
            sql.andWhere(`(
      p.name like :keyword
      OR p.city like :keyword
    )`, {keyword: `%${q.keyword}%`});
        }

        if (q.sex) {
            sql.andWhere(`(p.sex like :sex)`, {sex: `${q.sex}`});
        }

        if (q.name) {
            sql.andWhere(`(p.name like :name)`, {name: `%${q.name}%`});
        }

        if (q.city) {
            sql.andWhere(`(p.city like :city)`, {city: `${q.city}`});
        }

        if (q.country) {
            sql.andWhere(`(p.country like :country)`, {country: `${q.country}`});
        }

        const [entities, total] = await sql.getManyAndCount();

        const meta = new PageMeta({options: q, total});

        return new ProviderListPaginated(
            entities.map((sp) =>
                new ProviderPaginate(
                    sp.provider,
                    sp.provider.user,
                    sp.provider.images,
                    [sp],
                    sp.service,
                    sp.provider.evaluate,
                    sp.service.type
                )
            ),
            meta
        );
    }


    addService = async (providerId, data) => {
        await data.forEach(item => {
            this.serviceProviderRepository.save({provider: providerId, service: `${item}`})
        })
    }
    upDateService = async (providerId,data) => {
        console.log('update service')
        await this.deleteServiceById(providerId);
        await this.addService(providerId,data)
    }
    deleteServiceById = async (providerId) => {
        await this.serviceProviderRepository
            .createQueryBuilder('Provider')
            .delete()
            .where({ provider: providerId })
            .execute();
    }
    one = async (id) => {
        return await this.serviceProviderRepository.find({
            where: {
                id: id
            },
            relations: {
                provider: {
                    user: true
                },
                service: true
            }
        })
    }
}

export default new ServiceProviderService()