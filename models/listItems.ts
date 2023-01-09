import mongoose, { Schema, model, models, Document, Model } from "mongoose"

interface Iitem extends Document {
listId: mongoose.Types.ObjectId
title: string,
completed: boolean,
deleted: boolean,

}

//ref: reference the needed table using the name of the schema and
//the ObjectId sent on the fetch request

const itemSchema = new Schema<Iitem>({
  listId: {
    type: Schema.Types.ObjectId,
    ref: "listSchema",
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 300
    ,
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

const Items = models.Items as Model<Iitem> || model<Iitem>("Items", itemSchema)

export default Items


