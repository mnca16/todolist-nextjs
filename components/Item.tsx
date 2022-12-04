import React, {ChangeEvent, useState} from "react"
import {
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"

interface Props {
  item: Items, 
  deleteItem: (id: string) => void,
  handleChangeCheck: (id: string, e: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
  //checkStatus: boolean
}

const Item = ({ item, deleteItem, handleChangeCheck}: Props) => {
  const [checked, setChecked] = useState({complete: item.completed})
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setChecked({complete: !item.completed})
  handleChangeCheck(item._id, e, !item.completed)
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          onClick={() => {
            deleteItem(item._id)
          }}
        >
          <CancelPresentationIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemIcon>
        <Checkbox
          checked={checked.complete}
          color="secondary"
          edge="start"
          // onChange={(e) => {
          //   handleChangeCheck(item._id, e, checked)
          // }}
          onChange={handleChange}
          inputProps={{"aria-label": "controlled" }}
        />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  )
}

export default Item
