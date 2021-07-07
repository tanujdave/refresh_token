import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);

router.get(
  "/courses",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    return response.json([
      { id: 1, name: "ReactJS" },
      { id: 2, name: "NodeJS" },
      { id: 3, name: "AngularJS" },
    ]);
  }
);

export { router };
