import { User } from "../models/user"

export const fetchAllUser = async () => {
    const user = await User.find()
    return user
  }


  export const fetchUserById = async (userId: string) => {
    const user = await User.findOne({ _id:userId })
    return user
  }