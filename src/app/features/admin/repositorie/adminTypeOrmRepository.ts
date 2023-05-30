import { Repository } from "typeorm";
import { AdminEntity } from "../../../shared/entities/admin.entity";
import { pgHelper } from "../../../shared/helpers/pgHelper";


export class AdminTypeOrmRepository {
    private adminRepository?: Repository<AdminEntity> | any;

    async initializeRepository() : Promise<void> {
        this.adminRepository = pgHelper.client.manager.getRepository(AdminEntity);
    };

    
};