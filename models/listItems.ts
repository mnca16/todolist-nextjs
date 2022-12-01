import mongoose, { Schema, model, models, Document, Model } from "mongoose"

interface Iitem extends Document {
listId: mongoose.Types.ObjectId
title: string,
completed: boolean,
deleted: boolean,

}

const itemSchema = new Schema<Iitem>({
  listId: {
    type: Schema.Types.ObjectId,
    ref: "listSchema",
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  
})

//ref: reference the needed table using the name of the schema and
//the ObjectId sent on the fetch request

const Items = models.Items as Model<Iitem> || model<Iitem>("Items", itemSchema)

export default Items


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

