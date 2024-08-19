import { Admin } from "../models/admin"

export const fetchAdmin = async (email: string) => {
  const admin = await Admin.findOne({ email })
  return admin
}