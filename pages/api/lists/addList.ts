import connectMongo from "../../../lib/connectMongo"
import List from "../../../models/list"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API ADDS LIST TITLE
export default async function addList(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo() //connects with db
    const lists = await List.create(req.body) // ---> mangoose read method
    res.json({ lists })
  } catch (error) {
    res.json({ error })
  }
}
