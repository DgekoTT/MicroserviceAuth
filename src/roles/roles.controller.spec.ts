import {RolesController} from "./roles.controller";
import {RolesService} from "./roles.service";
import {Test, TestingModule} from "@nestjs/testing";
import {RolesModule} from "./roles.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {User} from "../users/user.model";
import {UserRoles} from "./user-role.model";


const moduleMocker = new ModuleMocker(global)

describe('check RolesController', () =>{
    let controller: RolesController;
    const mockRolesService = {};
    const mockGuard = {};

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [RolesService],
            imports: [RolesModule,
                SequelizeModule.forFeature([Role])
            ]
            })
            .overrideProvider(RolesService)
            .useValue(mockRolesService)
            .compile();

        controller = module.get<RolesController>(RolesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined()
    });

    }
)
