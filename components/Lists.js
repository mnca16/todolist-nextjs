import React, { useState } from "react"
import { CardActionArea, Box } from "@mui/material"

const Lists = ({ lists }) => {
  return (
    <ul>
      {lists.map((list) => {
        return (
          <li key={list.id}>
            <Box
              sx={{
                backgroundColor: "#E6E6FA",
                marginTop: "4rem",
                borderRadius: "10px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                transition: "0.3s",
                width: "20%",
              }}
            >
              <CardActionArea>
                <h1 style={{ margin: "50px" }}>{list.title}</h1>
              </CardActionArea>
            </Box>
          </li>
        )
      })}
    </ul>
  )
}

export default Lists
