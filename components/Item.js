import React from "react"
import {
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  Box,
} from "@mui/material"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"

const Item = ({ item }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end">
          <CancelPresentationIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemIcon>
        <Checkbox edge="start" />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  )
}

export default Item
