import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.routes";
import { UserRouter } from "../modules/users/user.routes";

const router = Router();

interface Route {
  path: string;
  router: Router;
}

const routes: Route[] = [
  {
    path: "/users",
    router: UserRouter,
  },
  {
    path: "/auth",
    router: AuthRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export const V1Router = router;
