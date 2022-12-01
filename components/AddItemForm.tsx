import { Button, Stack, TextField } from "@mui/material"
import React, { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/router"
import { ObjectId } from "bson"

//LIST ITEMS FORM

// interface Items {
//   completed: boolean,
//   deleted: boolean,
//   listId: string,
//   title: string, 
//   _v: number,
//   _id: string
// }

interface AddItemProps {
  addItem: (newItem: Items) => void
}

const AddItemForm = ({ addItem }: AddItemProps) => {
  //gets the id from useRouter method
  //and send on post request
  const router = useRouter()
  const { pid } = router.query 

  //controls input field
  const [itemTitle, setItemTitle] = useState({ title: "" })

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle({ title: e.target.value })
  }
   
  interface AddListName {
    title: string,
    listId: ObjectId;
  }
  
  //adds a list item title with the POST method  (the fornt-end)
  const addListItem = async (newListItem: AddListName) => {
    try {
      const res = await fetch("/api/listItems/addItem", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newListItem),
      })
        .then((res) => res.json())
        .then((res) => {
          addItem(res.listsItems)
        })
    } catch (error) {
      console.log("Fetch request failed", error)
    }
  }
  
  //Note:
  /*
  pid has string | string[] | undefined as a values
  I specified it as string because that is what ObjectId expects 
  */
  const handleItemSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addListItem({ ...itemTitle, listId: new ObjectId(pid as string) }) // ---> fetch resquest when item is submmited and send List id schema
    setItemTitle({ title: "" })
  }

  return (
    <form
      onSubmit={handleItemSubmit}
      style={{
        marginTop: "2rem",
        padding: "0 15% 0 15%",
      }}
    >
      <Stack spacing={2} direction="row">
        <TextField
          value={itemTitle.title}
          label="Add a new task"
          color="secondary"
          name="listItem"
          onChange={handleTitleChange}
          fullWidth
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="secondary"
        >
          Add
        </Button>
      </Stack>
    </form>
  )
}

export default AddItemForm


/*
Useful Links:
ObjectID type
https://www.designcise.com/web/tutorial/which-type-to-use-for-mongoose-objectid-in-a-typescript-interface

Function as props:
https://bobbyhadz.com/blog/react-typescript-pass-function-as-prop

*/