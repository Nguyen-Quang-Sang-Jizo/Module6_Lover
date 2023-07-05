import {Request, Response} from "express";
import serviceService from "../service/serviceService";

class ServiceController{

    getService = async (req: Request, res: Response) => {
        const idType = req.params.id;
        const service = await serviceService.getByIdService(idType);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json(service);
    }
    allService = async (req: Request, res: Response) => {
        let services = await serviceService.all()
        res.status(201).json({
            data: services
        })
    }
    basicService = async (req: Request, res: Response) => {
        let services = await serviceService.basic()
        res.status(201).json({
            data: services
        })
    }
    freeService = async (req: Request, res: Response) => {
        let services = await serviceService.free()
        res.status(201).json({
            data: services
        })
    }
    moreService = async (req: Request, res: Response) => {
        let services = await serviceService.more()
        res.status(201).json({
            data: services
        })
    }
}
export default new ServiceController()