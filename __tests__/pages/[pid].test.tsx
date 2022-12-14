/**
 * @jest-environment node
 */
import React from "react"
import { render } from "@testing-library/react"
import TodoList, { getServerSideProps } from "../../pages/todolist/[pid]"
import { memoryServerConnect, memoryServerStop } from "../../lib/connectMemoryServer"

describe("Tests HomePage and GetServerSideProps function", () => {
    it("Should return proper props from GetServerSideProps function", async () => {
      await memoryServerConnect()
      const props = await getServerSideProps()
      console.log("getServerSideProps", props)
      await memoryServerStop()
    })
  })