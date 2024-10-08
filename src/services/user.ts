import { User } from "../models/user"

export const fetchUser = async (email: string) => {
  const user = await User.findOne({ email })
  return user
}

export const fetchAllUser = async () => {
  const user = await User.find()
  return user
}

export const fetchUserById = async (userId: string) => {
  const user = await User.findOne({ _id: userId })
  return user
}

export const addUser = async (name: string, email: string, mobile: number) => {
  const newUser = await User.create({ name, mobile, email })
  return newUser
}

