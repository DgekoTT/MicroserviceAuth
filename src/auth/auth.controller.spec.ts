import {AuthController} from "./auth.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {AuthService} from "./auth.service";
import {AuthModule} from "./auth.module";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";

describe("test controller auth", () => {
    let controller: AuthController;
    const mockAuthService = {};

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
            imports: [AuthModule,
                JwtModule,
                UsersModule
            ]
        })
            .overrideProvider(AuthService)
            .useValue(mockAuthService)
            .compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined()
    });
})