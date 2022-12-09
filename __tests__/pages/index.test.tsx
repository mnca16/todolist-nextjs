import React from 'react'
import {render} from '@testing-library/react'
import HomePage, {  getServerSideProps } from '../../pages/index'
import connectMongo from "../../lib/connectMongo"
import {expect, jest, test} from '@jest/globals';


describe("HomaPage", () => {
    test("getServerSideProps returns the todos from mongo", async () => {
        const returnedTodos: ListsNames[] = [
            {
                deleted: false,
                name: "groceries",
                _v: 0,
                _id: "12345566"
            },
            {
                deleted: false,
                name: "job",
                _v: 0,
                _id: "1234512345"
            }

        ]

    })
})
