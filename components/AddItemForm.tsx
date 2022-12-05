import { Button, Stack, TextField } from "@mui/material"
import React, { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/router"
import { ObjectId } from "bson"

//LIST ITEMS FORM
interface AddItemProps {
  addItem: (newListItem: AddListName) => void
}

const AddItemForm = ({ addItem }: AddItemProps) => {
  /*
  gets the id from useRouter method
  and send on post request
  */
  const router = useRouter()
  const { pid } = router.query 

  //controls input field
  const [itemTitle, setItemTitle] = useState({ title: "" })

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle({ title: e.target.value })
  }
   
  //Note:
  /*
  pid has string | string[] | undefined as a values
  I specified it as string because that is what ObjectId expects 
  */
  const handleItemSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addItem({ ...itemTitle, listId: new ObjectId(pid as string) })// ---> fetch resquest when item is submmited and send List id schema
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
          inputProps={{ 
            maxLength: "20",  
            minLength: "3" 
          }}
          required={true}
          id="item"
          type="text"
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
