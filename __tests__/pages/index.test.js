/**
 * @jest-environment node
 */
import HomePage, { getServerSideProps } from "../../pages/index"
import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"
import connectMongo from "../../lib/connectMongo"

jest.mock("../../lib/connectMongo", () => {
  const original = jest.requireActual("../../lib/connectMongo")
  return {
    __esModule: true,
    default: jest.fn(original.default),
  }
})

let mongoServer, mongoUri, conn

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  mongoUri = mongoServer.getUri()
  process.env.MONGO_URI = mongoUri
  conn = await MongoClient.connect(mongoUri, {})
})

afterAll(async () => {
  if (conn) {
    await conn.close()
  }
  if (mongoServer) {
    await mongoServer.stop()
  }
})

describe("Tests HomePage and GetServerSideProps function", () => {
  it("Should return proper props from GetServerSideProps function - empty list", async () => {
    //Calls getServerSideProps function and consoles its props
    const result = await getServerSideProps()
    console.log("getServerSideProps", result)

    //Asserts that the proper props are being return and the is an empty stirng
    expect(Array.isArray(result.props.listsName)).toBeTruthy()
    expect(result).toEqual({ props: { listsName: [] } })
  })

  it("Should return proper props from GetServerSideProps function - all lists in an array", async () => {
    const data = [
      {
        name: "Name 1",
        deleted: false,
      },
      {
        name: "Name 2",
        deleted: false,
      },
      {
        name: "Name 3",
        deleted: false,
      },
    ]

    const db = conn.db(mongoServer.instanceInfo.dbName)
    console.log("data base", db)
    const res = await db.collection("lists").insertMany(data)
    console.log("data base name", res.insertedIds)
    const result = await getServerSideProps()
    expect(result.props).toBeDefined()
    console.log("result serversideprops", result.props)

    expect(result.props.listsName).toBeDefined()
    expect(Array.isArray(result.props.listsName)).toBeTruthy()
    expect(result.props.listsName.length).toBe(data.length)

    for (const i in res.lists) {
      expect(result.props.lists[i].name).toBe(lists[i].name)
    }

    for (const j in res.insertedIds) {
      expect(result.props.listsName[j]._id).toEqual(res.insertedIds[j] + "")
    }
  })

  it("Should return proper props from GetServerSideProps function - throws an error", async () => {
    connectMongo.mockImplementationOnce(async () => {
      throw new Error("error thrown test")
    })

    const result = await getServerSideProps()
    console.log("serversideprops", result)
    expect(result.props).toBeUndefined()
    expect(result.notFound).toBeDefined()
    expect(result.notFound).toBeTruthy()
  })
})
