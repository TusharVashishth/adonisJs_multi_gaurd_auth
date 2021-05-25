import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HomeController {
  public async index({ view }: HttpContextContract) {
    return view.render("front/home");
  }

  public async dashboard({ view }: HttpContextContract) {
    return view.render("front/dashboard/index");
  }
}
