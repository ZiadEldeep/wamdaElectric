"use server"
import { cookies } from 'next/headers';
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";
  import axios from 'axios';
  import { UserFormData } from '@/lib/schemas/userSchema';
export async function FetchPendingUsers() {
    await connectDB();
    
    const users = await User.find({ isApproved: false });
    return users;
}
export async function UserApproved(id:string) {
    await connectDB();
    const user = await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
  
    if (!user) {
       console.log({ message: "User not found." }, { status: 404 });
    }
  
     console.log({ message: "User approved successfully." }, { status: 200 });
  }
  export async function UserDeleted(id:string) {
    await connectDB();
    
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      console.log({ message: "User not found." }, { status: 404 });
    }
    console.log({ message: "User deleted successfully." }, { status: 200 });
  }
  
  interface AddUserInput {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'wholesale1' | 'wholesale2' | 'retail';
  }
  
  export const addUser = async (userData: AddUserInput) => {
    try {
      await connectDB();
      let Emailregx=RegExp( userData.email)
      // التحقق إذا كان المستخدم موجود بالفعل
      const existingUser = await User.findOne({ email:{ $regex: Emailregx} });
      if (existingUser) {
        return { success: false, message: 'User with this email already exists.' };
      }
  
      // إنشاء مستخدم جديد
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'retail', 
      });
  
      const savedUser = await newUser.save();
      return { success: true, message: 'User added successfully!', user: savedUser }; 
  
    } catch (error) {
      console.error('Error adding user:', error);
      return { success: false, message: 'An error occurred while adding user.' };
    }
  };
  

  
  // Function to get a user by ID
  export const getUserById = async (id: string) => {
    try {
       const user = await User.findById(id); // Make a GET request to the API
      return user; // Return the user data
    } catch (error: any) {
      console.error('Error fetching user:', error.message);
      return null; // Return null if there's an error
    }
  };
  
  // Function to update a user by ID
  export const updateUser = async (id: string, data: UserFormData) => {
    try {
     await connectDB()
      let user =await User.findByIdAndUpdate(id,{...data})
      return user; // Return the result of the update
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      return null; // Return null if there's an error
    }
  };
  // In a server component

export async function getUserData() {
  const cookieStore = cookies();
  const userDataCookie = cookieStore.get('userData');
  
  // console.error("iiiiiiiiiiiii-----",userDataCookie)
  if (userDataCookie) {
    try {
      const userData = JSON.parse(userDataCookie.value);
      // console.log(userData)
      return userData;
    } catch (error) {
      console.error('Error parsing user data cookie:', error);
    }
  }
  return null;
}

  