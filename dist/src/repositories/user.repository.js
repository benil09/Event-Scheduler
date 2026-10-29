import { prisma } from "../config/database.js";
// find all users
export async function getAllUsers() {
    const user = await prisma.user.findMany();
    return user;
}
// find user by id
export async function getUserById(id) {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
}
// find user by email
export async function findByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            Email: email
        }
    });
    return user;
}
// creating a user 
export async function createUserRep(data) {
    const user = await prisma.user.create({ data });
    return user;
}
// updating a user
export async function updateUserRep(id, data) {
    const user = await prisma.user.update({
        where: { id },
        data
    });
    return user;
}
// deleting a user
export async function deleteUserRep(id) {
    const user = await prisma.user.delete({
        where: { id }
    });
    return user;
}
//# sourceMappingURL=user.repository.js.map