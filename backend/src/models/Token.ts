import { model, Schema, Document } from "mongoose";
import { IUser } from "./User.js";

const Token = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, require: true },
});

export interface IToken {
  user: IUser;
  refreshToken: string;
}

export interface ITokenDocument extends IToken, Document {}
export default model("Token", Token);
