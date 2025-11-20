import Users from "../../lib/database/models/Users";

export async function getUsers() {
  return await Users.findAll();
}