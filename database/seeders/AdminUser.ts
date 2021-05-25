import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Admin from "App/Models/Admin";

export default class AdminUserSeeder extends BaseSeeder {
  public async run() {
    const data = {
      name: "Admin",
      email: "admin@admin.com",
      password: "123456",
    };

    await Admin.create(data);
  }
}
