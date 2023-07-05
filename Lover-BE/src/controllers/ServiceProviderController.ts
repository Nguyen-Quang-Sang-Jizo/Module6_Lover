import {Request, Response} from "express";
import ServiceProviderService from "../service/ServiceProviderService";
import {Service} from "../entity/Service";
import jwt from "jsonwebtoken";
import {ProviderListPaginated} from "../lib/provider-paginate";

class ServiceProviderController {




    find = async (req: Request, res: Response) => {
        const typeId = req.params.id;
        const { page, take, keyword, sex, name, city, country } = req.query;
        const query = {
            page: parseInt(String(page), 10) || 1,
            take: parseInt(String(take), 10) || 15,
            keyword: keyword || '',
            sex: sex || '',
            name: name || '',
            city: city || '',
            country: country || ''
        };

        const providerList: ProviderListPaginated = await ServiceProviderService.all(typeId, query);
        res.status(201).json(providerList);
    }


    getOne = async (req: Request, res: Response) => {
        console.log(req)
        let id = req.params.id

        let one = await ServiceProviderService.one(id)
        res.status(200).json({
            data: one
        })
    }
}
export default new ServiceProviderController()