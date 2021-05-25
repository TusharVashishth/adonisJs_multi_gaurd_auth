/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
import "./admin";
import Route from "@ioc:Adonis/Core/Route";

Route.get("/login", "Front/AuthController.showLoginForm");
Route.post("/login", "Front/AuthController.userLogin").as("login");
Route.post("/api/login", "Front/AuthController.apiLogin").as("api.login");
Route.get("/register", "Front/AuthController.showRegisterForm");
Route.post("/register", "Front/AuthController.register").as("register");
Route.get("/", "Front/HomeController.index");

Route.get("/dashboard", "Front/HomeController.dashboard")
  .as("dashboard")
  .middleware("auth:web");

Route.get("/api/dashboard", ({ response, auth }) => {
  return response.json(auth.use("api").user);
}).middleware("auth:api");
