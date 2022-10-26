import connectMongo from "../../../lib/connectMongo"
import Items from "../../../models/listItems"

// NEXT.JS BUILT IN API ADDS LIST TITLE
export default async function addListItem(req, res) {
  try {
    await connectMongo() //connects with db
    const listsItems = await Items.create(req.body) // ---> mangoose read method
    res.json({ listsItems })
  } catch (error) {
    res.json({ error })
  }
}
