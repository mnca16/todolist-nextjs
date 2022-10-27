import React, {useState} from "react"
import { Stack, Box, Divider, isMuiElement } from "@mui/material"
import AddItemForm from "../../components/AddItemForm"
import ListItems from "../../components/ListItems"
import connectMongo from "../../lib/connectMongo"
import Items from "../../models/listItems"
import { ObjectId } from "bson"
import { useRouter } from "next/router"

//THIS FILE SHOWS THE LIST TITLE AND ITS ITEMS

const TodoList = ({items}) => {
  //gets the id and list title from useRouter method 
  const router = useRouter()
  const { pid, slug } = router.query
 
  const [listItems, setListItems] = useState(items)

  const addItem = (newItem) => {  
     setListItems([...listItems, newItem])    
  }


  return (
    <Box sx={{margin: "auto", width: "60%", padding: "10px"}}>
     <Stack
      sx={{ textAlign: "center", marginTop: "4rem"}}
     >
     <h1 style={{textAlign: "start"}}>{slug} ✔️</h1>
     <Divider />
     <AddItemForm addItem={addItem}/>
     </Stack>  
     <ListItems listItems={listItems}/>
    </Box>  
  )
}


export async function getServerSideProps({ params }) {
  console.log("params typeof", typeof params.pid)
  //connect to MONGODB
  await connectMongo()

  try {
    const itemsSchemaResult = await Items.find({ listId: ObjectId(params.pid) })// --> gets the right schema with the ObjectId List
    const items = itemsSchemaResult.map((doc) => {
      const item = doc.toObject()
      item._id = item._id.toString()
      item.listId = item.listId.toString()
      return item
    })
    return {
      props: { items: items },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default TodoList
