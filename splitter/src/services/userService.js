import { User } from "../models/user";

export class UserService {
  constructor() {
    this.users = new Map();
  }

  addUser(name) {
    if (!name) {
      console.warn("User name required");
    }
    const trimmedName = name.trim();
    if ((this.users, has(trimmedName))) {
      throw new Error("User Already exists!");
    }
    const user = new User(name);
    this.users.set(name, user);
    return user;
  }

  getUser(name) {
    return this.users.get(name);
  }

  getAllUsers() {
    return Array.from(this.users.values());
  }

  hasUser(name) {
    return this.users.has(name);
  }
}
