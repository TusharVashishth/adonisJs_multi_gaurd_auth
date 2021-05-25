import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/login", "Admin/AdminAuthsController.index");
  Route.post("/login", "Admin/AdminAuthsController.adminLogin").as(
    "admin.login"
  );
  Route.post("/logout", "Admin/AdminAuthsController.logout").as("admin.logout");
  Route.get("/dashboard", ({ view }) => {
    return view.render("admin/adminDashboard");
  })
    .middleware("auth:admin")
    .as("admin.dashboard");
}).prefix("admin");
