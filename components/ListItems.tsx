import React, {ChangeEvent} from "react"
import Item from "./Item"
import { List } from "@mui/material" 

interface ListItemsProps {
  listItems: Items[],
  deleteItem: (id: string) => void,
  handleChangeCheck: (id: string, checked: boolean) => void,
  //checkStatus: boolean
}

const ListItems = ({ listItems, deleteItem, handleChangeCheck }: ListItemsProps) => {
  return (
    <List
      sx={{
        maxWidth: "100%",
        bgcolor: "background.paper",
        listStyle: "none",
        marginTop: "2.5rem",
      }}
    >
      {listItems.map((item: Items) => {
        return (
          <Item
            key={item._id}
            item={item}
            deleteItem={deleteItem}
            handleChangeCheck={handleChangeCheck}
          />
        )
      })}
    </List>
  )
}

export default ListItems
