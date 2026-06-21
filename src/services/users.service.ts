

import {getAllUsers, getUserById,createUserRep,updateUserRep, deleteUserRep} from "../repositories/user.repository.js"
import { notFound } from "../utils/api-error.js";


export async function getAllUsersService(){
    const resp= await getAllUsers();
    return resp;
}
export async function getUserByIdService(id:number){

    const resp= await getUserById(id);
    if(!resp){
        throw  notFound("User not found")
    }
    return resp;
}

export const createUserService = async (Email : string , name : string )=>{

    if(!Email || !name){
        throw new Error ("Email or name field is missing")
    }
    const response = await createUserRep(Email,name);

    if(!response){
        throw new Error ("Unable to create user")
    }

    return response;
}


export const updateUserService = async (data : string , userId:number)=>{
    

    const response = await updateUserRep(data , userId);
    return response;
}

export const deleteUserService = async (userId : number)=>{
    const response = await deleteUserRep(userId);
    return response;
}