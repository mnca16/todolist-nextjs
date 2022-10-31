import connectMongo from "../../../lib/connectMongo"
import Items from "../../../models/listItems"

// NEXT.JS BUILT IN API GETS LIST TITLES
export default async function getItems(req, res) {
  try {
    await connectMongo()
    const lists = await Items.find({}) // ---> mongoose read method (reads all the data)
    res.json({ lists })
  } catch (error) {
    res.json({ error })
  }
}
