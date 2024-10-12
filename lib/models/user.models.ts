import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  isApproved: boolean;
  role: 'admin' | 'wholesale1' | 'wholesale2' | 'retail'; // إضافة الحقل الجديد
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: true, // بشكل افتراضي، الحسابات غير معتمدة
  },
  role: {
    type: String,
    enum: ['admin', 'wholesale1', 'wholesale2', 'retail'], // تحديد الأدوار المتاحة
    default: 'retail', // تعيين القيمة الافتراضية
    required: true,
  },
});

// Create and export the User model
const User = mongoose.models?.User || mongoose.model('User', userSchema);
export default User;
