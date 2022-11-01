import connectMongo from "../../../lib/connectMongo"
import List from "../../../models/list"

// NEXT.JS BUILT IN API GETS LIST TITLES
export default async function getList(req, res) {
  try {
    await connectMongo()
    const lists = await List.find({ deleted: false }) // ---> mongoose read method (reads all the data)
    res.status(200).json({ lists })
  } catch (error) {
    res.status(500).json({ error })
  }
}
