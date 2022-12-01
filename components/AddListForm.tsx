import React, { useState, ChangeEvent, FormEvent } from "react"
import {
  CardActions,
  Box,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

// LIST NAMES FORMS

// interface ListsNames {
//   deleted: boolean,
//   name: string,
//   _v: number,
//   _id: string
// }

interface AddListProps {
  addNewList: (newItem: ListsNames) => void
}

const AddListForm = ({ addNewList }: AddListProps) => {
  //Controlled component
  const [listTitle, setListTitle] = useState({ name: "" })

  const handleListTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListTitle({ name: e.target.value })
  }
  

  //adds a list name with the POST method  (fornt-end)
  const addList = async (newList: {name: string}) => {
    try {
      const res = await fetch("/api/lists/addList", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
      })
        .then((res) => res.json())
        .then((res) => {
          addNewList(res.lists)
        })
    } catch (error) {
      console.log("Fetch request failed", error)
    }
  }

  const handleListSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addList(listTitle) // ---> fetch resquest when list is submmited
    setListTitle({ name: "" })
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
        margin: "4rem 0 1rem 10rem",
      }}
    >
      <CardContent>
        <Typography variant="h3">Create List</Typography>
      </CardContent>
      <CardActions>
        <form onSubmit={handleListSubmit}>
          <TextField
            value={listTitle.name}
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
