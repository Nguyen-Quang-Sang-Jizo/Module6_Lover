import {Request, Response} from "express";
import typeService from "../service/typeService";

class TypeController{

    getType =  async (req: Request, res: Response) => {
        let allType = await typeService.getAllType()
        res.status(200).json(allType)
    }

}
export default new TypeController()