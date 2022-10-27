import React, { useState } from "react"
import Link from "next/Link"
import {
  CardActionArea,
  Box,
  CardContent,
  CardActions,
  Button,
} from "@mui/material"

//LIST NAMES MAIN PAGE
const Lists = ({ list, deleteList }) => {
  return (
    <ul style={{ listStyle: "none" }}>
      {list.map((list) => {
        return (
          <li key={list._id}>
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
              <CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      deleteList(list._id)
                    }}
                  >
                    Delete List
                  </Button>
                </CardActions>
                <CardActionArea>
                  <h1 style={{ margin: "50px" }}>
                    <Link
                      href={{
                        pathname: `/todolist/${list._id}`,
                        query: { slug: list.name },
                      }}
                    >
                      {list.name}
                    </Link>
                  </h1>
                </CardActionArea>
              </CardContent>
            </Box>
          </li>
        )
      })}
    </ul>
  )
}

export default Lists
