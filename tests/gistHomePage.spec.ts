import {test , expect} from '@playwright/test'

test.describe ('gist homepage test' , () =>{

    test.beforeEach( async ({page}) =>{
        await page.goto("https://gist.github.com/")
    })


test('Search Gists by keyword' ,async ({page})=>{

// locate the search box and enter the search data
await page.locator('[placeholder="Search…"]').fill("kiran")
await page.keyboard.press("Enter")

// Get the search result in text
const searchResult= await page.locator('[class="d-flex flex-column flex-md-row flex-justify-between position-relative"]').innerText()
expect(searchResult).toMatch('gist results')
console.log(searchResult)
})

})