import {expect, test} from "@playwright/test"
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

//let con: MongoClient;
// let mongoServer: MongoMemoryServer;

// test.beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri =  mongoServer.getUri();
//   await mongoose.connect(uri);
// });

//let con: MongoClient;


test.describe("Home Page - renders home page and adds a list", async () => {
  let mongoServer: MongoMemoryServer;

  // test.beforeAll(async () => {
  // mongoServer = await MongoMemoryServer.create();
  // const uri =  mongoServer.getUri();
  // await mongoose.connect(uri);
  // });

    test("renders home page", async ({page}) => {
      mongoServer = await MongoMemoryServer.create();
      const uri =  mongoServer.getUri();
      await mongoose.connect(uri);
      
      await page.goto("/")
      await expect(page).toHaveTitle("Todo")
      await page.locator("#list").type("Test 345")

      //await page.on("request", req => console.log(`>> : ${req.method()} ${req.resourceType()} ${req.url()}`))
      //await page.on("response", res => console.log(`>> : ${res.status()} ${res.url()}`))
      
      page.on('worker', worker => {
        console.log('Worker created: ', worker.url());
       // worker.on('close', worker => console.log('Worker destroyed: ' + worker.url()));
      });
      
      console.log('Current workers:');
      for (const worker of page.workers())
      console.log('  ' + worker.url());

      await page.locator("#submit-list").click()
      await page.waitForLoadState("networkidle");
      //const listName = page.getByRole('button', { name: 'Test 345' }).first()
      await expect(page.locator("#list-name")).toContainText("Test 345")
      //await expect(listName).toBeTruthy()
      //await expect(listName).toBeVisible();
    })
})