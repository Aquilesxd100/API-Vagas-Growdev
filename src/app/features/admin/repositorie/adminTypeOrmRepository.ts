import { Repository } from "typeorm";
import { AdminEntity } from "../../../shared/entities/admin.entity";
import { pgHelper } from "../../../shared/helpers/pgHelper";


class AdminTypeOrmRepository {
    private adminRepository?: Repository<AdminEntity>;

    async initializeRepository() : Promise<void> {
        this.adminRepository = pgHelper.client.manager.getRepository(AdminEntity);
    };

    async getAdminById(id : string) : Promise<AdminEntity | null | undefined> {
        return await this.adminRepository?.findOne({ where: { id: id } });
    };

    async getAdminByUserName(userName : string) : Promise<AdminEntity | null | undefined> {
        return await this.adminRepository?.findOne({ where: { userName: userName } });
    };

    async createAdmin(newAdmin : AdminEntity) : Promise<void> {
        await newAdmin.save();
    };

};

export const adminRepository = new AdminTypeOrmRepository;