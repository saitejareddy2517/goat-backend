import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { User } from './users.schema';
import { Response } from 'express'; 

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signup(signupDto: SignupDto, res: Response): Promise<any> {
    const { name, email, userName, password, walletAddress, role } = signupDto;

    // Check if userName or email already exists
    const existingEmail = await this.userModel.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    //check if username already taken

    const userNameExists = await this.userModel.findOne({ userName });

    if (userNameExists) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      userName,
      password: hashedPassword,
      walletAddress,
      role,
    });

    try {
      const savedUser = await newUser.save();
      return res.status(201).json({
        message: 'User created successfully',
        data: savedUser,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
