

import { createUserDto, updateUserDto } from "../dtos/user.dto.js";
import {getAllUsers, getUserById,createUserRep, findByEmail, updateUserRep, deleteUserRep} from "../repositories/user.repository.js"
import { conflict, notFound } from "../utils/api-error.js";

// find all user service
export async function getAllUsersService(){
    const resp= await getAllUsers();
    return resp;
}

// find user by id service 
export async function getUserByIdService(id:number){

    const resp= await getUserById(id);
    if(!resp){
        throw  notFound("User not found")
    }
    return resp;
}

// create user service
export  const createUserService = async (data:createUserDto)=>{

    //check if the user already exists or not 
    const existingUser = await findByEmail(data.Email);
    if(existingUser){
        throw conflict("User already exist")
    }
    const response = await createUserRep(data);

    if(!response){
        throw new Error ("Unable to create user")
    }

    return response;
}

// update user service
export const updateUserService = async (id: number, data: updateUserDto) => {
    const user = await getUserById(id);
    if (!user) {
        throw notFound("User not found");
    }

    if (data.Email) {
        const existingUser = await findByEmail(data.Email);
        if (existingUser && existingUser.id !== id) {
            throw conflict("Email already in use");
        }
    }

    const response = await updateUserRep(id, data);
    if (!response) {
        throw new Error("Unable to update user");
    }
    return response;
}

// delete user service
export const deleteUserService = async (id: number) => {
    const user = await getUserById(id);
    if (!user) {
        throw notFound("User not found");
    }

    const response = await deleteUserRep(id);
    if (!response) {
        throw new Error("Unable to delete user");
    }
    return response;
}



