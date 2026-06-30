import {prisma} from "../config/database.js"
import { createUserDto, updateUserDto } from "../dtos/user.dto.js";

// find all users
export async function getAllUsers(){
   const user = await prisma.user.findMany();
   return user;
}

// find user by id
export async function getUserById(id:number){
   const user = await prisma.user.findUnique({where:{id:id}});
   return user
}

// find user by email
export async function findByEmail(email:string){
    const user = await prisma.user.findUnique({
        where:{
            Email:email
        }
    })
    return user;
}

// creating a user 
export async function createUserRep(data:createUserDto){
    const user = await  prisma.user.create({data});
    return user
}

// updating a user
export async function updateUserRep(id:number, data:updateUserDto){
    const user = await prisma.user.update({
        where: { id },
        data
    });
    return user;
}

// deleting a user
export async function deleteUserRep(id:number){
    const user = await prisma.user.delete({
        where: { id }
    });
    return user;
}

