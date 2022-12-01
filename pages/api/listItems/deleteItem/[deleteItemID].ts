import connectMongo from "../../../../lib/connectMongo"
import Items from "../../../../models/listItems"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API DELETES LIST TITLES BY ID
export default async function deleteItem(req: NextApiRequest, res: NextApiResponse) {
  const { deleteItemID } = req.query // ---> next.js dynamic API request helper
  console.log("req.query", req.body)

  try {
    await connectMongo()
    await Items.findByIdAndUpdate(deleteItemID, { deleted: true })
    const deletedItem = await Items.findById(deleteItemID)
    console.log("deleteItem", deletedItem)
    res.json({ deletedItem })
    if (!deletedItem) {
      return res.json({ message: "there is not list available" })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
