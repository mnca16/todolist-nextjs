//Ideally, you would create a schema/model file for each that is needed.

//LIST NAMES SCHEMA

/*
model
- model is a function that receives two arguments: a name which the name 
of the collection, and the schema you created it.
- an instance of a model is called document.    
- connects a schema (data blueprint) with a name 
- typically you name a model with a capital starting character 
- the model is exported because is what we'll be using to manipulate our db
*/

/*
models
- the models method prevents the app to create a new model every time the route is being 
used.
- in this case is being use with the logical operator.
*/

import { Schema, model, models } from "mongoose"

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
})

const List = models.List || model("List", listSchema)

export default List
