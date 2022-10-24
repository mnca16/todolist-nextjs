import React, { useState } from "react"
import {
  CardActions,
  Box,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

const AddListForm = ({ addNewList }) => {
  //Controlled component
  const [listTitle, setListTitle] = useState("")
  console.log(listTitle)

  const handleListTitleChange = (e) => {
    setListTitle(e.target.value)
  }

  const handleListSubmit = (e) => {
    console.log("listTitle", listTitle)
    e.preventDefault()
    addNewList({
      id: Date.now(),
      title: listTitle,
    })
    setListTitle("")
  }

  return (
    <Box
      sx={{
        backgroundColor: "#E6E6FA",
        borderRadius: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        width: "30%",
        padding: "1rem 0 1.5rem 2rem",
      }}
    >
      <CardContent>
        <Typography variant="h3">Create List</Typography>
      </CardContent>
      <CardActions>
        <form onSubmit={handleListSubmit}>
          <TextField
            value={listTitle}
            label="Add a new List"
            color="secondary"
            name="listTitle"
            onChange={handleListTitleChange}
          />
          <IconButton type="submit">
            <AddIcon fontSize="large" />
          </IconButton>
        </form>
      </CardActions>
    </Box>
  )
}

export default AddListForm
