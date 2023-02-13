import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import mailServices from "./mail-services.js";
import tokenServices from "./token-services.js";
import UserDTO from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserServices {
  async registration(email: string, password: string) {
    const findCandidate = await User.findOne({ email });
    if (findCandidate) {
      throw ApiError.BadRequest(
        "Пользователь с почтовым адрессом уже существует"
      );
    } else {
      const hashPassword = bcrypt.hashSync(password, 7);
      const activationLink = v4();
      const user = await User.create({
        email,
        password: hashPassword,
        activationLink,
      });
      await mailServices.sendActivationMail(
        email,
        `${process.env.API_URL}/api/user/activate/${activationLink}`
      );
      const userDto = new UserDTO(user);
      const tokens = tokenServices.generateTokens({ ...userDto });
      await tokenServices.saveToken(userDto.id, tokens.refreshToken);
      return {
        ...tokens,
        user: userDto,
      };
    }
  }

  async activate(activationLink: string) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest(
        "Пользователь с почтовым адрессом уже существует"
      );
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw ApiError.BadRequest("Не корректный пароль");
    }
    const userDto = new UserDTO(user);
    const tokens = tokenServices.generateTokens({ ...userDto });
    await tokenServices.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenServices.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnAuthorizedError();
    }
    const userData = await tokenServices.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenServices.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnAuthorizedError();
    }
    const user = await User.findById({ _id: userData.id });
    if (user) {
      const userDto = new UserDTO(user);
      const tokens = tokenServices.generateTokens({ ...userDto });
      await tokenServices.saveToken(userDto.id, tokens.refreshToken);
      return {
        ...tokens,
        user: userDto,
      };
    }
  }
  async getAllUsers() {
    const users = await User.find();
    return users;
  }
}

export default new UserServices();
