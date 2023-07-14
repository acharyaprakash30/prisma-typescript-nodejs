import { db } from "../utils/db.server";

export type Author = {
    id:number;
    firstName:string;
    lastName:string

}

export const listAuthos = async ():Promise <Author[]>=>{
    return db.author.findMany({
        select:{
            id:true,
            firstName:true,
            lastName:true
        }
    })
    
}


export const getAuthor = async (id:number):Promise <Author | null> =>{
    return (
        db.author.findUnique({
            where:{
                id:id
            }
        })
    )
}

export const createAuthor  = async( author: Omit<Author, "id">):Promise<Author> =>{
    const {firstName,lastName} = author;
    return db.author.create({
        data:{
            firstName,
            lastName
        }
    })
}

export const updateAuthor = async(author:Omit<Author,"id">,id:number) => {
    const {firstName,lastName} = author
    return (
        db.author.update({
            where:{
                id:id
            },
            data:{
                firstName,
                lastName
            }
        })
    )
}
export const deleteAuthor = async (id:number): Promise<void>=>{
    await db.author.delete({
        where:{
            id:id
        }
    })
}

