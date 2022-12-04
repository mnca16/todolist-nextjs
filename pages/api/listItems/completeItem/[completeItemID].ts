import connectMongo from "../../../../lib/connectMongo"
//import connectMongo from "@libs/connectDB"
import Items from "../../../../models/listItems"
import { NextApiRequest, NextApiResponse } from "next"

// NEXT.JS BUILT IN API DELETES LIST TITLES BY ID
export default async function completedItem(req: NextApiRequest, res: NextApiResponse) {
  const { completeItemID } = req.query // ---> next.js dynamic API request helper
  console.log("query: ", completeItemID)

  try {
    await connectMongo()
    const listItem = await Items.findById(completeItemID)
    
    if (!listItem) {
      res.status(500).json({ message: "There is not item" })
      return
    }
    
    if (listItem!.completed) {
      await Items.findByIdAndUpdate(completeItemID, { completed: false })
    } else {
      await Items.findByIdAndUpdate(completeItemID, { completed: true })
    }

    const completedItemResponse = await Items.findById(completeItemID)
    res.status(200).json({ completedItemResponse })

  } catch (error) {
    res.status(500).json({ error })
  }
}

//Note: ts thinks listItem can be null, I thought about two solutions for this. 1 add and if
// statament to check listItem or add ! post-fix to assert that its operand is non-null and non-undefined
//This value would not be null because the check button appears on the screen with 
//todoitems only 