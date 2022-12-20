import React, {useState, ChangeEvent, useEffect} from "react"
import { Stack, Box, Divider} from "@mui/material"
import AddItemForm from "../../components/AddItemForm"
import ListItems from "../../components/ListItems"
import ArrowButton from "../../components/ArrowButton"
import connectMongo from "../../lib/connectMongo"
import Items from "../../models/listItems"
import { ObjectId } from "bson"
import { useRouter } from "next/router"
import { GetServerSideProps, NextPage} from "next"
import { ParsedUrlQuery } from 'querystring';
import { Container } from "@mui/material"

interface TodoListProps {
  items: Items[] //Items interface comes from types.d.ts file
}

//THIS FILE SHOWS THE LIST TITLE AND ITS ITEMS
const TodoList: NextPage<TodoListProps> = ({items}) => {
  //gets the id and list title from useRouter method 
  const router = useRouter()
  const { title, pid } = router.query
 
  const [listItems, setListItems] = useState(items) // --> listItems state
  const [inputError, setInputError] = useState("")
  

  /*
  Adds new item and updates the UI
  adds a list item title with the POST method  (the fornt-end)
  AddListName comes from types.d.ts file and represents the data we're sending to the db
  */
  const addItem = async (newListItem: AddListName): Promise<void> => {
    try {
      await fetch("/api/listItems/addItem", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newListItem),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Item title or list-id not found");
        }
        return response
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res)
          setListItems([...listItems, res.listsItems])
        })
        .catch((error) => { 
          //Only network errors get here, fetch API 
          console.log("error", error.message)
          //setInputError(error.response.data.message)
        })
    } catch (error) {
      let msg = (error as Error).message;
      console.log("Fetch request failed", msg)
    }
  }

  //Soft deletes the seletec item and updates the UI with the api response 
  const deleteItem = async (id: string): Promise<void> => {
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
        const deletedItem = listItems.filter((item) => 
        item._id !== res.deletedItem._id)
        setListItems(deletedItem)
      })
    } catch (error) {
      console.log("fetch request failed", error)
    }
  }

 //Get items function API
  const getItems = async (): Promise<void> => {
      try {
        //await fetch(`/api/listItems/getItems/${pid}`)
        await fetch("/api/listItems/getItems/")
        .then(resp => resp.json())
        .then(res =>
          {
          const currentItems = res.lists.filter((item: Items) => 
            item.listId === pid && item.deleted === false)
          setListItems(currentItems)})
      } catch (error) {
        console.log("fetch request failed", error)
      }
  }  
  
  //Updates completed item
  const checkItem = async (id: string): Promise<void> => {
    try {
      await fetch(`/api/listItems/completeItem/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(resp => resp.json())
      .then(res => { 
        getItems()
      })
    } catch (error) {
      console.log("fetch request failed", error)
    }
  }
 
  const handleChangeCheck = (id: string, checked: boolean) => {
    //conditional sends requests to update item complete status
    checked ? checkItem(id) : checkItem(id)
  }


    const completedItems = listItems.filter((item) => item.completed === true)
    const incompletedItems = listItems.filter((item) => item.completed === false)

  
  
  return (
    <Container fixed>
    <Box sx={{margin: "auto", width: "60%", padding: "10px"}}>
     <Stack
      sx={{ textAlign: "center", marginTop: "4rem"}}
     >
      <Stack spacing={4} direction="row">
        <ArrowButton/>
        <h1 style={{textAlign: "start", paddingBottom: "5px"}}>{title} ✒️</h1>
     </Stack>
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
    </Container>
  )
}

type Props = {
  props: {
    items: Items[]
  }
  // notFound?: boolean
}


interface Params extends ParsedUrlQuery {
  pid: string
} 

export const getServerSideProps: GetServerSideProps = async ({ params }): Promise<Props>=> {
  const { pid } = params as Params;
  //connect to MONGODB
  await connectMongo()

  try {
    const itemsSchemaResult = await Items.find({ listId: new ObjectId(pid), deleted: false})// --> gets the right schema with the ObjectId List
    const items = itemsSchemaResult.map((doc) => {
      const item = doc.toObject<Items>() //The schema is converted to an object so id becamos unknown, I use the Item interface but I can also use an asertion
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
    throw error
    // return {
    //   notFound: true,
    // }
  }
}

export default TodoList
