import React from "react"
import {
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"

const Item = ({ item, deleteItem, checkItem, handleChangeCheck, checked }) => {
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
          edge="start"
          checked={checked}
          onChange={(e) => {
            checkItem(item._id)
            handleChangeCheck(e)
          }}
        />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  )
}

export default Item
