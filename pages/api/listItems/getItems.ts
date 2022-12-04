import connectMongo from "../../../lib/connectMongo"
import Items from "../../../models/listItems"
import List from "../../../models/list"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API GETS LIST TITLES
export default async function getItems(req: NextApiRequest, res: NextApiResponse) {
  console.log("query: ", req.query)
  try {
    await connectMongo()
    const lists = await Items.find({}) // ---> mongoose read method (reads all the data)
    res.status(200).json({ lists })
  } catch (error) {
    res.status(500).json({ error })
  }
}

//Make this a Dynamic route and received the List id 
//Add and if statement in case the list is not found