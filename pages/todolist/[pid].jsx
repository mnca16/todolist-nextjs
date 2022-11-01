import React, {useState} from "react"
import { Stack, Box, Divider} from "@mui/material"
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
  const { title } = router.query
 
  const [listItems, setListItems] = useState(items) // --> listItems state
  const [checked, setChecked] = useState(true)
  
  //Adds new item and updates the UI
  const addItem = (newItem) => {  
     setListItems([...listItems, newItem])    
  }

  //Soft deletes the seletec item and updates the UI
  const deleteItem = async (id) => {
    console.log("item id", id)
    try {
       await fetch(`/api/listItems/deleteItem/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({deleted: true}),
        
      })
      .then((res) => res.json())
      .then((res) => {
        const deletedItem = listItems.filter((item) => item._id !== res.deletedItem._id)
        console.log("deletedItem", deleteItem)
        setListItems(deletedItem)
      })
    } catch (error) {
      console.log("fetch request failed", error)
    }
  }

 //Get items function API
  const getItems = async () => {
    console.log("This Function is running!!!!!!")
      try {
        await fetch("/api/listItems/getItems")
        .then(resp => resp.json())
        .then(res =>
          {console.log(res.lists)
          setListItems(res.lists)})
      } catch (error) {
        console.log("fetch request failed", error)
      }
  }  
  
  //Updates completed item
  const checkItem = async (id) => {
    console.log("CHECK ITEM IS RUNNING!!")
    try {
      await fetch(`/api/listItems/completeItem/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(resp => resp.json())
      .then(res => { getItems()})
    } catch (error) {
      console.log("fetch request failed", error)
    }
  }
 
  const handleChangeCheck = (id, e) => {
    setChecked(e.target.checked)
    //conditional sends requests to update item complete status
    checked ? checkItem(id) : checkItem(id)
  }

  const completedItems = listItems.filter((item) => item.completed === true)
  const incompletedItems = listItems.filter((item) => item.completed === false)
  
  return (
    <Box sx={{margin: "auto", width: "60%", padding: "10px"}}>
     <Stack
      sx={{ textAlign: "center", marginTop: "4rem"}}
     >
     <h1 style={{textAlign: "start"}}>{title} ✒️</h1>
     <Divider />
     <AddItemForm addItem={addItem}/>
     </Stack>  
     <ListItems 
        listItems={incompletedItems} 
        deleteItem={deleteItem} 
        handleChangeCheck={handleChangeCheck}
        />
     <Stack
      sx={{ textAlign: "center", marginTop: "4rem"}}
      >
      <h1 style={{textAlign: "start"}}>Completed ✔️</h1>
      <Divider />
      <ListItems 
        listItems={completedItems}
        deleteItem={deleteItem} 
        handleChangeCheck={handleChangeCheck}
        />
     </Stack>
    </Box>  
  )
}


export async function getServerSideProps({ params }) {
  console.log("params typeof", typeof params.pid)
  //connect to MONGODB
  await connectMongo()

  try {
    const itemsSchemaResult = await Items.find({ listId: ObjectId(params.pid), deleted: false})// --> gets the right schema with the ObjectId List
    const items = itemsSchemaResult.map((doc) => {
      const item = doc.toObject()
      item._id = item._id.toString()
      item.listId = item.listId.toString()
      return item
    })
   
    return {
      props: { 
        items: items,
       }
    }

  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default TodoList
