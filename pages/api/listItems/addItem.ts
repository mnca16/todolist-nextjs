import connectMongo from "../../../lib/connectMongo"
import Items from "../../../models/listItems"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API ADDS LIST TITLE
export default async function addListItem(req: NextApiRequest, res: NextApiResponse) {
  console.log("body: ", req.body)

  try {
    await connectMongo() //connects with db
    
    if (!req.body.title || !req.body.listId) {
      console.log("Item title or list-id not found")
      return res.status(500).json({message: "Item title or list-id not found"})
      //throw new Error("Item title or list-id not found")
    } 

    const listsItems = await Items.create(req.body) // ---> mangoose read method
    res.status(200).json({ listsItems })
  } catch (error) {
    console.log(error)
    let msg = (error as Error).message;
    res.status(500).json({ message: msg })
  }
}


//Make sure the input field is not empty 