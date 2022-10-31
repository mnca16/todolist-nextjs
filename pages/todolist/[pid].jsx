import React, {useState} from "react"
import { Stack, Box, Divider} from "@mui/material"
import AddItemForm from "../../components/AddItemForm"
import ListItems from "../../components/ListItems"
import connectMongo from "../../lib/connectMongo"
import Items from "../../models/listItems"
import { ObjectId } from "bson"
import { useRouter } from "next/router"

//THIS FILE SHOWS THE LIST TITLE AND ITS ITEMS

const TodoList = ({items, itemsComplete}) => {
  // Use a toggle and make a condtion that goes from true to false
  //Use that condition to dynamically move item from completed to lisst 
 
  //gets the id and list title from useRouter method 
  const router = useRouter()
  const { title } = router.query
 
  const [listItems, setListItems] = useState(items) // --> listItems state
  const [checked, setChecked] = useState(false)
  
  
  const completedItems = listItems.filter((item) => item.completed === true)
  console.log("completedItems",completedItems)
  const incompletedItems = listItems.filter((item) => item.completed === false)
  console.log("incompletedItems", incompletedItems)

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
        .then(res => setListItems(res.lists))
      } catch (error) {
        console.log("fetch request failed", error)
      }
  }  
  

  const checkItem = async (id) => {
    
    //const checkedItem = checkedBool === false ? true : false
    //setCheckedBool(checkedItem)
   
   
    try {
      await fetch(`/api/listItems/completeItem/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({completed: true})
      })
      .then(resp => resp.json())
      .then(res => {
        getItems()
        //   const checkedItem = listItems.filter((item) => item._id === res.completedItem._id)
        //   console.log("checkedItem", checkedItem)
        //   setChecked([...checked, ...checkedItem])
      })
    } catch (error) {
      console.log("fetch request failed", error)
    }
  }

  const handleChangeCheck = (event) => {
    console.log("EVENET HANDLE CHECK",event.target.checked)
    setChecked(event.target.checked)
  }



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
        checkItem={checkItem}
        handleChangeCheck={handleChangeCheck}
        checked={checked}
        />
     <Stack
      sx={{ textAlign: "center", marginTop: "4rem"}}
      >
      <h1 style={{textAlign: "start"}}>Completed ✔️</h1>
      <Divider />
      <ListItems 
        listItems={completedItems}
        deleteItem={deleteItem} 
        checkItem={checkItem}
        handleChangeCheck={handleChangeCheck}
        checked={checked}
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
    //const itemsSchemaResult = await Items.find({ listId: ObjectId(params.pid), deleted: false, completed: false})
    const items = itemsSchemaResult.map((doc) => {
      const item = doc.toObject()
      item._id = item._id.toString()
      item.listId = item.listId.toString()
      return item
    })
    
    // const completedItems = itemsSchemaResult.map((doc) => {
    //   const completedItem = doc.toObject()
    //   console.log("completedItem", completedItem)
    // })
    
    // completedItems
    // const itemsSchemaResult1 = await Items.find({ listId: ObjectId(params.pid), deleted: false, completed: true})// --> gets the right schema with the ObjectId List
    // const items1 = itemsSchemaResult1.map((doc) => {
    //   const item = doc.toObject()
    //   item._id = item._id.toString()
    //   item.listId = item.listId.toString()
    //   return item
    // })


    return {
      props: { 
        items: items,
        // itemsComplete: items1
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
