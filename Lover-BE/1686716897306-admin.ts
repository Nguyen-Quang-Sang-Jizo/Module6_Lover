import { getRepository, MigrationInterface, QueryRunner } from "typeorm"
import { User } from "./src/entity/User";
import bcrypt from "bcrypt";
import { Role } from "./src/entity/Role";

//cách sử dụng https://orkhan.gitbook.io/typeorm/docs/migrations
//muốn tạo migration nào thì sử dụng typeorm migration:create tên của bảng
//lưu ý tách các migration ra

export class Admin1686716897306 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = new User();
        user.username = 'admin';
        user.email = 'admin';
        user.password = await bcrypt.hash(user.email, 10)
        //cái này tư động add role default vào
        // user.role = ;
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
