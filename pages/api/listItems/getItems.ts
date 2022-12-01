import connectMongo from "../../../lib/connectMongo"
import Items from "../../../models/listItems"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API GETS LIST TITLES
export default async function getItems(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo()
    const lists = await Items.find({}) // ---> mongoose read method (reads all the data)
    res.json({ lists })
  } catch (error) {
    res.json({ error })
  }
}

//Add validation, if statement for list does not exist 