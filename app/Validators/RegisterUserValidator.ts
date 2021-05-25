import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(100),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(30),
      rules.confirmed(),
    ]),
  });

  public messages = {
    required: "The {{ field }} is required to create a new account",
    minLength: "The {{ field }} must have {{ options.minLength }} items",
    maxLength: "The {{ field }} must have {{ options.maxLength }} items",
    "email.unique": "Email already taken",
  };
}
