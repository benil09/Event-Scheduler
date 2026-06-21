
import {getAllUsersService, getUserByIdService,createUserService,updateUserService, deleteUserService} from "../services/users.service.js"
import { Request,Response } from "express"

export  async function getAllUsers(_req:Request,res:Response){
    const response = await getAllUsersService();
    return res.json(response);
}

export async function getUserById(req:Request,res:Response){
    const {id} = req.params;
    const response = await getUserByIdService(Number(id))
    return res.json(response)
}

export async function createUser(req:Request,res:Response) {
    try {
        const { Email , name } = req.body;
        console.log(Email,name);
        const response = await createUserService(Email,name);
        return res.status(201).json({success:true,data:response});

    } catch (error:any) {
        console.log("Error in create user controller");
        res.status(500).json({success:false,message: error.message})
    }
}


export async function updateUser (req:Request,res:Response){
    try {
        // const {Email , name} = req.body;
        const {id } = req.params;
        const response = await updateUserService(req.body,Number(id));
        return res.status(200).json({success:true,data:response})
    } catch (error:any) {
        console.log("Error in update user controller : " ,error)
        return res.status(500).json({success:false,message:error.message})
    }

}

export async function deleteUser(req:Request,res:Response){
    try {
        const {id} = req.params
        const response = await deleteUserService(Number(id));
        return res.status(200).json({success:true,data : response})
    } catch (error:any) {

        console.log("Error in delete user controller" , error);
        return res.status(500).json({success:false,message:error.message})
    }
}