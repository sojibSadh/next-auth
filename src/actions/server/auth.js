"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from 'bcryptjs';

export const postUser = async (payload) => {

    // check user exit of not
    const isExist = await dbConnect("users").findOne({ email: payload.email });
    if (isExist) {
        return {
            success: false,
            message: "user allready exiosted"
        }
    }


    const hashPassword = await bcrypt.hash(payload.password, 10);
    console.log(hashPassword);
    //2 create new user
    const newUser = {
        ...payload,
        createdAt: new Date().toISOString(),
        role: 'user',
        password: hashPassword
    }


    //3 send user to database
    const result = await dbConnect('users').insertOne(newUser);
    if (result.acknowledged) {
        return {
            success: true,
            message: `user created with ${result.insertedId.toString()}`
        }
    } else {
        return {
            success: false,
            message: `Something Went Wrong. try again`
        }
    }
}