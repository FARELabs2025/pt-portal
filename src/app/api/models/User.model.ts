import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string; // Optional - only set after approval
  name: string;
  labName: string;
  accreditationNo?: string;
  mobileNo: string;
  county?: string;
  postalZipCode: string;
  city?: string;
  address?: string;
  labCode?: string;
  role: 'user' | 'admin';
  registrationStatus: 'pending' | 'approved' | 'rejected';
  isEmailSent: boolean;
  temporaryPassword?: string; // Store plain password (kept in database even after approval)
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: false, // Not required until approval
      select: false, // Don't include in queries by default
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    labName: {
      type: String,
      required: true,
      trim: true,
    },
    accreditationNo: {
      type: String,
      trim: true,
      default: 'Not available',
    },
    mobileNo: {
      type: String,
      required: true,
      trim: true,
    },
    county: {
      type: String,
      trim: true,
    },
    postalZipCode: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    labCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    registrationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    isEmailSent: {
      type: Boolean,
      default: false,
    },
    temporaryPassword: {
      type: String,
      select: false, // Don't include in queries by default
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
// Note: email, username, and labCode already have indexes from 'unique: true' above
// Only add indexes for non-unique fields that need query optimization
UserSchema.index({ registrationStatus: 1 });

// Check if model already exists to avoid re-compilation errors
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;


