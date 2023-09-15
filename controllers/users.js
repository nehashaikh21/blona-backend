import User from "../models/user.js";

//get users
export function getUsers(req, res) {
  User.find({}).then((data) => res.json(data));
}
