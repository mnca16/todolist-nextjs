import { Button, Stack, TextField } from "@mui/material"
import React, { useState } from "react"

const AddItemForm = ({ addItem }) => {
  //controls input field
  const [itemTitle, setItemTitle] = useState("")

  const handleTitleChange = (e) => {
    setItemTitle(e.target.value)
  }

  const handleItemSubmit = (e) => {
    console.log("itemTitle", itemTitle)
    e.preventDefault()
    addItem({
      id: Date.now(),
      title: itemTitle,
    })
    setItemTitle("")
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
          value={itemTitle}
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
