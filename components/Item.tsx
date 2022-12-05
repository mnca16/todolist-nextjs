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
  handleChangeCheck: (id: string, checked: boolean) => void,
}

const Item = ({ item, deleteItem, handleChangeCheck}: Props) => {
  const [checked, setChecked] = useState({complete: item.completed})
  
  const handleChange = () => {
  setChecked({complete: !item.completed})
  handleChangeCheck(item._id, !item.completed)
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
          onChange={handleChange}
          inputProps={{"aria-label": "controlled" }}
        />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  )
}

export default Item
