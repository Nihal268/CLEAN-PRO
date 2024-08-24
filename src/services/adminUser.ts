import { User } from "../models/user"

export const fetchAllUser = async () => {
    const user = await User.find()
    return user
  }