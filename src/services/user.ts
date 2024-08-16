import { User } from "../models/user"

export const fetchUser = async (email: string) => {
  const user = await User.findOne({ email })
  return user
}

export const addUser = async (name: string, email: string, password: string, mobile: number) => {
  const newUser = await User.create({ name, mobile, password, email })
  return newUser
}