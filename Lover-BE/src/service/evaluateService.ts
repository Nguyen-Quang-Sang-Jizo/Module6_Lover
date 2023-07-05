import { AppDataSource } from "../ormconfig";
import { Evaluate } from "../entity/Evaluate";

class EvaluateService{
    private evaluateRepository;
    constructor() {
        this.evaluateRepository = AppDataSource.getRepository(Evaluate)
    }
   
    addComment = async (evaluate, providerId, user) => {
        const newProvider={
            star : evaluate.star,
            comment: evaluate.comment,
            provider: providerId,
            user:user
            
        }
       let data= await this.evaluateRepository.save(newProvider);
       return data
    }

}
export default new EvaluateService()