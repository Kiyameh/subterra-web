import UserModel from '@/database/models/User.model'

export default function getUserByEmail(email: string) {
  try {
    const foundUser = UserModel.findOne({
      email: email,
    })
    return foundUser
  } catch (e) {
    console.log(e)
    return null
  }
}
