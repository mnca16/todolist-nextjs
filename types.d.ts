interface ListsNames {
    _id: string 
    deleted: boolean,
    name: string,
    _v: number,
}

interface Items {
  _id: string,
  listId: string,
  completed: boolean,
  deleted: boolean,
  title: string,
  _v: number,
}

interface AddListName {
  title: string,
  listId: ObjectId;
}