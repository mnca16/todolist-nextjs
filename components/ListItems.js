import React from "react"
import Item from "./Item"
import { List } from "@mui/material"

const ListItems = ({ listItems }) => {
  console.log(listItems)
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
        return <Item key={item.id} item={item} />
      })}
    </List>
  )
}

export default ListItems
