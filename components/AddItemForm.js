import { Button, Stack, TextField } from "@mui/material"
import React, { useState } from "react"
import { useRouter } from "next/router"
import { ObjectId } from "bson"

//LIST ITEMS FORM

const AddItemForm = ({ addItem }) => {
  //gets the id from useRouter method
  //and send on post request
  const router = useRouter()
  const { pid } = router.query

  //controls input field
  const [itemTitle, setItemTitle] = useState({ title: "" })

  const handleTitleChange = (e) => {
    setItemTitle({ title: e.target.value })
  }

  //adds a list item title with the POST method  (the fornt-end)
  const addListItem = async (newListItem) => {
    console.log(newListItem)
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

  const handleItemSubmit = (e) => {
    e.preventDefault()
    addListItem({ ...itemTitle, listId: ObjectId(pid) }) // ---> fetch resquest when item is submmited and send List id schema
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
        <Button type="submit" size="large" variant="contained">
          Add
        </Button>
      </Stack>
    </form>
  )
}

export default AddItemForm
