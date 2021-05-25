import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AdminAuthsController {
  public async index({ view }: HttpContextContract) {
    return view.render("admin/adminLogin");
  }

  public async adminLogin({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }),
    });
    const payload = await request.validate({ schema: loginSchema });
    try {
      await auth.use("admin").attempt(payload.email, payload.password);
      session.flash("success", "Successfully Logged In!");
      return response.redirect().toRoute("admin.dashboard");
    } catch (error) {
      session.flash("error", "Invalid credentials");
      return response.redirect().back();
    }
  }

  public async logout({ auth, response, session }: HttpContextContract) {
    await auth.use("admin").logout();
    session.flash("success", "Successfully Logged Out!");
    return response.redirect().toRoute("/admin/login");
  }
}
