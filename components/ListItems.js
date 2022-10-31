import React from "react"
import Item from "./Item"
import { List } from "@mui/material"

const ListItems = ({
  listItems,
  deleteItem,
  checkItem,
  handleChangeCheck,
  checked,
}) => {
  return (
    <List
      sx={{
        maxWidth: "100%",
        bgcolor: "background.paper",
        listStyle: "none",
        marginTop: "2.5rem",
      }}
    >
      {listItems.map((item) => {
        return (
          <Item
            key={item._id}
            item={item}
            deleteItem={deleteItem}
            checkItem={checkItem}
            handleChangeCheck={handleChangeCheck}
            checked={checked}
          />
        )
      })}
    </List>
  )
}

export default ListItems
