import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegisterUserValidation from "App/Validators/RegisterUserValidator";
import User from "App/Models/User";

export default class AuthController {
  public async showLoginForm({ view }: HttpContextContract) {
    return view.render("front/auth/login");
  }
  public async showRegisterForm({ view }: HttpContextContract) {
    return view.render("front/auth/register");
  }

  public async register({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidation);
    await User.create(payload);
    session.flash("success", "Account created successfully!");
    return response.redirect("/login");
  }

  public async userLogin({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }),
    });
    console.log(request.all());
    const payload = await request.validate({ schema: loginSchema });
    console.log("below");
    try {
      await auth.use("web").attempt(payload.email, payload.password);
      session.flash("success", "Successfully Logged In!");
      return response.redirect().toRoute("dashboard");
    } catch (error) {
      session.flash("error", "Invalid credentials");
      return response.redirect().back();
    }
  }
  public async apiLogin({ request, response, auth }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }),
    });
    console.log(request.all());
    const payload = await request.validate({ schema: loginSchema });

    try {
      const token = await auth
        .use("api")
        .attempt(payload.email, payload.password, {
          expiresIn: "90days",
        });

      return token.toJSON();
    } catch (error) {
      return response.json({ status: 400, message: "Invalid Credentials" });
    }
  }
}
