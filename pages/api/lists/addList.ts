import connectMongo from "../../../lib/connectMongo"
import List from "../../../models/list"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API ADDS LIST TITLE
export default async function addList(req: NextApiRequest, res: NextApiResponse) {
  console.log("body: ", req.body)

  try {
    await connectMongo() //connects with db
    
    if(!req.body) {
      return res.status(500).json({message: "List name not found"})
    }

    const lists = await List.create(req.body) // ---> mangoose read method
    res.status(200).json({ lists })
  } catch (error) {
    res.status(400).json({ error })
  }
}
