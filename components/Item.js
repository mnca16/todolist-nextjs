import React from "react"
import {
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"

const Item = ({ item, deleteItem, handleChangeCheck }) => {
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
          color="secondary"
          edge="start"
          onChange={(e) => {
            handleChangeCheck(item._id, e)
          }}
        />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  )
}

export default Item
