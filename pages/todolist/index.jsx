import React, {useState} from "react"
import { Stack, Box, Divider } from "@mui/material"
import AddItemForm from "../../components/AddItemForm"
import ListItems from "../../components/ListItems"


const TodoList = () => {
  const [listItems, setListItems] = useState([])

  const addItem = (newItem) => {
     setListItems([...listItems, newItem])
  }
  return (
    <Box sx={{margin: "auto", width: "60%", padding: "10px"}}>
     <Stack
      sx={{ textAlign: "center", marginTop: "4rem"}}
     >
     <h1 style={{textAlign: "start"}}>To do List ✔️</h1>
     <Divider />
     <AddItemForm addItem={addItem}/>
     </Stack>
     <ListItems listItems={listItems}/>
    </Box>
  )
}

export default TodoList
