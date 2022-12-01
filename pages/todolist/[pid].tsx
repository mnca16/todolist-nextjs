import React, {useState, ChangeEvent} from "react"
import { Stack, Box, Divider} from "@mui/material"
import AddItemForm from "../../components/AddItemForm"
import ListItems from "../../components/ListItems"
import connectMongo from "../../lib/connectMongo"
import Items from "../../models/listItems"
import { ObjectId } from "bson"
import { useRouter } from "next/router"
import { GetServerSideProps, NextPage, GetServerSidePropsContext} from "next"
//import { ParsedUrlQuery } from 'node:querystring'
import { ParsedUrlQuery } from 'querystring';

// interface Items {
//   completed: boolean,
//   deleted: boolean,
//   listId: string,
//   title: string,
//   _v: number,
//   _id: string
// }

interface TodoListProps {
  items: Items[]
}


//THIS FILE SHOWS THE LIST TITLE AND ITS ITEMS
const TodoList: NextPage<TodoListProps> = ({items}) => {
  //gets the id and list title from useRouter method 
  const router = useRouter()
  const { title, pid } = router.query
 
  const [listItems, setListItems] = useState(items) // --> listItems state
  const [checked, setChecked] = useState(true)
  
  //Adds new item and updates the UI
  //Used Item interface
  const addItem = (newItem: Items) => {  
     setListItems([...listItems, newItem])    
  }

  //Soft deletes the seletec item and updates the UI with the api response 
  const deleteItem = async (id: string) => {
    try {
       await fetch(`/api/listItems/deleteItem/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({deleted: true}),
        
      })
      .then((res) => res.json())
      .then((res) => {
        const deletedItem = listItems.filter((item) => 
        item._id !== res.deletedItem._id)
        setListItems(deletedItem)
      })
    } catch (error) {
      console.log("fetch request failed", error)
    }
  }

 //Get items function API
  const getItems = async () => {
      try {
        await fetch("/api/listItems/getItems")
        .then(resp => resp.json())
        .then(res =>
          {
          const currentItems = res.lists.filter((item: Items) => 
            item.listId === pid && item.deleted === false)
          setListItems(currentItems)})
      } catch (error) {
        console.log("fetch request failed", error)
      }
  }  
  
  //Updates completed item
  const checkItem = async (id: string) => {
    try {
      await fetch(`/api/listItems/completeItem/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(resp => resp.json())
      .then(res => { 
        getItems()
      })
    } catch (error) {
      console.log("fetch request failed", error)
    }
  }
 
  const handleChangeCheck = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    //conditional sends requests to update item complete status
    checked ? checkItem(id) : checkItem(id)
  }

  const completedItems = listItems.filter((item) => item.completed === true)
  const incompletedItems = listItems.filter((item) => item.completed === false)
  
  return (
    <Box sx={{margin: "auto", width: "60%", padding: "10px"}}>
     <Stack
      sx={{ textAlign: "center", marginTop: "4rem"}}
     >
     <h1 style={{textAlign: "start"}}>{title} ✒️</h1>
     <Divider />
     <AddItemForm addItem={addItem}/>
     </Stack>  
     <ListItems 
        listItems={incompletedItems} 
        deleteItem={deleteItem} 
        handleChangeCheck={handleChangeCheck}
        />
     <Stack
      sx={{ textAlign: "center", marginTop: "4rem"}}
      >
      <h1 style={{textAlign: "start"}}>Completed ✔️</h1>
      <Divider />
      <ListItems 
        listItems={completedItems}
        deleteItem={deleteItem} 
        handleChangeCheck={handleChangeCheck}
        />
     </Stack>
    </Box>  
  )
}


interface Params extends ParsedUrlQuery {
  pid: string
}

// interface Params = {
//   params: {pid: string} 
// }

// export const getServerSideProps: GetServerSideProps = async ({ params }: Params) => {
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { pid } = params as Params;
  console.log("pid from seversideprops", typeof pid)
  //connect to MONGODB
  await connectMongo()

  try {
    const itemsSchemaResult = await Items.find({ listId: new ObjectId(pid), deleted: false})// --> gets the right schema with the ObjectId List
    const items = itemsSchemaResult.map((doc) => {
      const item = doc.toObject()
      item._id = item._id?.toString()
      item.listId = item.listId.toString()
      return item
    })
   
    return {
      props: { 
        items: items,
       }
    }

  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}
















// export async function getServerSideProps({ params }) {
//   console.log("params typeof", typeof params.pid)
//   //connect to MONGODB
//   await connectMongo()

//   try {
//     const itemsSchemaResult = await Items.find({ listId: ObjectId(params.pid), deleted: false})// --> gets the right schema with the ObjectId List
//     const items = itemsSchemaResult.map((doc) => {
//       const item = doc.toObject()
//       item._id = item._id.toString()
//       item.listId = item.listId.toString()
//       return item
//     })
   
//     return {
//       props: { 
//         items: items,
//        }
//     }

//   } catch (error) {
//     console.log(error)
//     return {
//       notFound: true,
//     }
//   }
// }

/*
Links for ObjectID:
https://github.com/Automattic/mongoose/issues/10960
https://stackoverflow.com/questions/69863210/upgrade-mongoose-from-5-to-6-value-of-type-typeof-objectid-is-not-callable-di
https://stackoverflow.com/questions/38939507/error-ts2348-value-of-type-typeof-objectid-is-not-callable-did-you-mean-to-i

Links for params (on GetServerSideProps params) error:
https://github.com/vercel/next.js/discussions/16522
https://github.com/vercel/next.js/issues/11033
https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props


Links for Params ServerSideError Property 'pid' does not exist on type 'ParsedUrlQuery | undefined'
https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
https://github.com/vercel/next.js/discussions/16522
https://www.google.com/search?q=const+getServerSideProps%3A+GetServerSideProps%3C%7B+%5Bkey%3A+string%5D%3A+any%3B+%7D%2C+ParsedUrlQuery%2C+PreviewData%3E&rlz=1C1CHBF_enUS862US863&oq=const+getServerSideProps%3A+GetServerSideProps%3C%7B+%5Bkey%3A+string%5D%3A+any%3B+%7D%2C+ParsedUrlQuery%2C+PreviewData%3E&aqs=chrome..69i57.585j0j7&sourceid=chrome&ie=UTF-8
https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
*/


export default TodoList
