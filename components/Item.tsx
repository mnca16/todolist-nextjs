import React, {ChangeEvent} from "react"
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
  handleChangeCheck: (id: string, e: ChangeEvent<HTMLInputElement>) => void
}

const Item = ({ item, deleteItem, handleChangeCheck }: Props) => {
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
