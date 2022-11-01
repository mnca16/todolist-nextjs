import connectMongo from "../../../../lib/connectMongo"
import Items from "../../../../models/listItems"

// NEXT.JS BUILT IN API DELETES LIST TITLES BY ID
export default async function completedItem(req, res) {
  const { completeItemID } = req.query // ---> next.js dynamic API request helper
  console.log("completedItemID", completeItemID)

  try {
    await connectMongo()
    const listItem = await Items.findById(completeItemID)
    if (listItem.completed) {
      await Items.findByIdAndUpdate(completeItemID, { completed: false })
    } else {
      await Items.findByIdAndUpdate(completeItemID, { completed: true })
    }

    const completedItemResponse = await Items.findById(completeItemID)
    res.status(200).json({ completedItemResponse })

    if (!completedItem) {
      return res.json({ message: "there is not list available" })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
