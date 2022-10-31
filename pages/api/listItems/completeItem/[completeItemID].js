import connectMongo from "../../../../lib/connectMongo"
import Items from "../../../../models/listItems"

// NEXT.JS BUILT IN API DELETES LIST TITLES BY ID
export default async function completedItem(req, res) {
  const { completeItemID } = req.query // ---> next.js dynamic API request helper
  console.log("req.query", req.query)

  try {
    await connectMongo()
    await Items.findByIdAndUpdate(completeItemID, { completed: true })
    const completedItem = await Items.findById(completeItemID)
    console.log("completedItem", completedItem)
    res.json({ completedItem })
    if (!completedItem) {
      return res.json({ message: "there is not list available" })
    }
  } catch (error) {
    res.json({ error })
  }
}
