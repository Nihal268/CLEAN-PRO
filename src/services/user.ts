import { User } from "../models/user"

export const fetchUser = async (mobile: number) => {
  const user = await User.findOne({ mobile })
  return user
}

export const addUser = async (name: string, mobile: number, password: string) => {
  const newUser = await User.create({ name, mobile, password })
  return newUser
}