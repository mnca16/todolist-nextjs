import React, { useState, ChangeEvent, FormEvent } from "react"
import {
  CardContent,
  Typography,
  TextField,
  IconButton,
  Card, 
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

// LIST NAMES FORMS
interface AddListProps {
  addNewList: (newList: {name: string}) => void
}

const AddListForm = ({ addNewList }: AddListProps) => {
  //Controlled component
  const [listTitle, setListTitle] = useState({ name: "" })

  const handleListTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListTitle({ name: e.target.value })
  }

  const handleListSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNewList(listTitle) // ---> fetch resquest when list is submmited\
    setListTitle({ name: "" })
  }

  return (
    <Card
      elevation={8}
      sx={{
        backgroundColor: "#E6E6FA",
        borderRadius: "3rem",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        padding: "1rem 0 1.5rem 2rem",
        margin: "4rem 0 1rem 3rem",
        width: 345
      }}
    >
      <CardContent>
        <Typography variant="h3">Create List</Typography>
        <form onSubmit={handleListSubmit}>
          <TextField
            value={listTitle.name}
            label="Add a new List"
            color="secondary"
            name="listTitle"
            onChange={handleListTitleChange}
            inputProps={{ 
              maxLength: "20",  
              minLength: "3", 
            }}
            required={true}
            id="list"
          />
          <IconButton id="submit-list" type="submit">
            <AddIcon fontSize="large" />
          </IconButton>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddListForm
