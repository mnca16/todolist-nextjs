import connectMongo from "../../../lib/connectMongo"
import List from "../../../models/list"

// NEXT.JS BUILT IN API DELETES LIST TITLES BY ID
export default async function deleteList(req, res) {
  const { deleteListID } = req.query // ---> next.js dynamic API request helper
  try {
    await connectMongo()
    const deletedListTitle = await List.deleteOne({ _id: deleteListID })

    //
    // const deletedListTitle = await List.deleteOne({
    //   _id: "63586827d68664c0451bf0c2",
    // })

    if (!deletedListTitle) {
      return res.json({ message: "there is not list available" })
    }
  } catch (error) {
    res.json({ error })
  }
}
