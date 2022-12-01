import connectMongo from "../../../lib/connectMongo"
import Items from "../../../models/listItems"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API ADDS LIST TITLE
export default async function addListItem(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo() //connects with db
    const listsItems = await Items.create(req.body) // ---> mangoose read method
    res.status(200).json({ listsItems })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}


//Make sure the input field is not empty 