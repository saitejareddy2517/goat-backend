import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletAddress: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), default: Role.USER },
});

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  userName: string;
  password: string;
  walletAddress: string;
  role: Role;
}
