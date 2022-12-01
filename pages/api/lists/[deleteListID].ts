import connectMongo from "../../../lib/connectMongo"
import List from "../../../models/list"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API DELETES LIST TITLES BY ID
export default async function deleteList(req: NextApiRequest, res: NextApiResponse) {
  const { deleteListID } = req.query // ---> next.js dynamic API request helper
  try {
    await connectMongo()
    const deletedListTitle = await List.findByIdAndUpdate(deleteListID, {
      deleted: true,
    })

    const deletedList = await List.findById(deleteListID)
    console.log("deleteItem", deletedList)
    res.json({ deletedList })

    if (!deletedListTitle) {
      return res.json({ message: "there is not list available" })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}


    // const deletedListTitle = await List.deleteOne({
    //   _id: "63586827d68664c0451bf0c2",
    // })
