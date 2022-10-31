import mongoose, { Schema, model, models } from "mongoose"

// - Lists <-- collection
// 	{
// 		_id: <mongo_id>,
// 		title: ''
// 	}

// - Items <-- collection
// 	{
// 		_id: <mongo_id>,
// 		title,
// 		status, --> active, completed, deleted
// 		list_id
// 	}

// db.collection('Items').find({list_id : <id>, status : 'active'}).sort({_id: 1}) -> Mongodb

const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listSchema",
  },
})

//ref: reference the needed table using the name of the schema and
//the ObjectId sent on the fetch request

const Items = models.Items || model("Items", itemSchema)

export default Items
