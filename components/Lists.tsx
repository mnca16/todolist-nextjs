import React from "react"
import Link from "next/link"
import {
  CardActionArea,
  IconButton,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"

interface ListProps {
  list: ListsNames[],
  deleteList: (id: string) => void,
}


//LIST NAMES MAIN PAGE
const Lists = ({ list, deleteList }: ListProps) => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {list.map((list: ListsNames) => {
        return (
          <Grid
            sx={{
              backgroundColor: "#E6E6FA",
              marginTop: "4rem",
              borderRadius: "10px",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              transition: "0.3s",
              width: "20%",
              xs: "12",
            }}
            key={list._id}
            item
            m={5}
          >
            <CardContent>
              <CardActions>
                <IconButton
                  sx={{ marginLeft: "12rem" }}
                  size="small"
                  onClick={() => {
                    deleteList(list._id)
                  }}
                >
                  <CancelPresentationIcon />
                </IconButton>
              </CardActions>
              <CardActionArea>
                <h1 style={{ margin: "50px" }}>
                  <Link
                    href={{
                      pathname: `/todolist/${list._id}`,
                      query: { title: list.name },
                    }}
                  >
                    {list.name}
                  </Link>
                </h1>
              </CardActionArea>
            </CardContent>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Lists
