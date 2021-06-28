import { PrismaClient, User } from "@prisma/client";
import { injectable } from "inversify";
import { DBUser } from "../types/db";

@injectable()
export default class Database {
  private client = new PrismaClient();

  public async getUser(userId: string) {
    return await this.client.user.findFirst({ where: { discordId: userId } });
  }

  public async createUser(userId: string) {
    return await this.client.user.create({ data: { discordId: userId } });
  }

  public async updateUser(user: User, data: DBUser) {
    return await this.client.user.update({ data, where: { id: user.id } });
  }
}
