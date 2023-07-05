import { Conversation } from './../entity/Conversation';
import { AppDataSource } from "../ormconfig";

class ConversationService{
    private conversationRepository;
    constructor() {
        this.conversationRepository = AppDataSource.getRepository(Conversation)
    }
    showAll = async (userId: number)=> {
    return await this.conversationRepository.createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.user1", "user1")
      .leftJoinAndSelect("conversation.user2", "user2")
      .where("user1.id = :userId OR user2.id = :userId", { userId })
      .getMany();
  };
    addConversation = async (user1,user2) => {
        const newConversation={
            user1:user1,
            user2: user2
        }
       let data= await this.conversationRepository.save(newConversation);
       return data
    }
    check = async (user1, user2) => {
        const findConversation = await this.conversationRepository.findOne({
             where:  [
                { user1: { id: user1 }, user2: { id: user2 } },
                { user1: { id: user2 }, user2: { id: user1 } }        
            ]
            });
        return !findConversation; // Trả về true nếu không tìm thấy otp có owner trùng
      };

}
export default new ConversationService()