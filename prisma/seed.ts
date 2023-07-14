import { db } from "../src/utils/db.server";

type Author ={
    firstName: string;
    lastName: string;
}
type Book = {
    title: string;
    isFriction: boolean;
    datePublished: Date;
}
function  getAuthors():Array<Author>{
    return([
        {
            firstName:"prakash",
            lastName:"acharya"
        },
        {
            firstName:"ashok",
            lastName:"kumar"
        },
        {
            firstName:"rabin",
            lastName:"pokhrel"
        },

    ])
}

function getBooks():Array<Book>{
    return([
        {
            title:"my first title",
            isFriction:true,
            datePublished:new Date()
        },
        {
            title:"my second title",
            isFriction:true,
            datePublished:new Date()
        },
        {
            title:"my third title",
            isFriction:true,
            datePublished:new Date()
        },
    ])
}

async function seed(){
    await Promise.all(
        getAuthors().map((item)=>{
            const {firstName,lastName} = item;

            return db.author.create({
                data:{
                    firstName,
                    lastName
                }
            })
        })
    )
    const author = await db.author.findFirst({
        where:{
            firstName: "prakash"
        }
    });
    if(author){
        await Promise.all(
            getBooks().map((item)=>{
                const {title,isFriction,datePublished} = item;
    
                return db.book.create({
                    data:{
                        title,
                        isFriction,
                        datePublished,
                        authorId:author.id
                    }
                })
            })
        )
    } else {
        console.error("Author 'prakash' not found."); // Optional: Handle the case when the author is not found
      }

    
}

seed();

