import { IUser, IUserDocument } from "../models/User.js";

class UserDTO {
  email: string;
  id: string;
  isActivated: boolean;
  constructor(model: IUserDocument) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
export default UserDTO;
