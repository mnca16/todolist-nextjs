import { Schema, model, models, Document, Model } from "mongoose"

interface Ilist extends Document {
  name: string,
  deleted: boolean
}

const listSchema = new Schema<Ilist>({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 10,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
})

const List = models.List as Model<Ilist> || model<Ilist>("List", listSchema)

export default List
