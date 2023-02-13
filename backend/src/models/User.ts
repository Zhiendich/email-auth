import { Request } from "express";
import { model, Schema, Document } from "mongoose";

const User = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

export interface IUser {
  email: string;
  isActivated: boolean;
  password: string;
  activationLink: string;
}

export interface UserRequest extends Request {
  user?: IUser;
}

export interface IUserDocument extends IUser, Document {}
export default model<IUserDocument>("User", User);
