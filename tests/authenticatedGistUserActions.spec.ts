import {test , expect} from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage';
import { DeleteGist } from '../page-objects/delete';

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });

test.describe ('gist authenticated user test' , () =>{

    test.beforeEach( async ({page}) =>{
       
        // open the browser
       await page.goto("https://gist.github.com/")    
        var loginpage = new LoginPage(page)
        loginpage.login("kiranjacob1010@gmail.com" , "Sacretheart@2024")

    } )


test('GistVerifyThe User' ,async ({page})=>{
    
    // click on the profile pic
    await page.locator('[class="Header-item position-relative mr-0 d-none d-md-flex"]').locator('details').locator('img').click()  

    //Select the 'your gists' option
    await page.locator('.dropdown-item').first().click() 
    
    // Verify the profile name
    const username=  await page.locator('[class="p-nickname vcard-username d-block"]').innerText()
    console.log(username)
    expect (username) .toEqual ("kiranjacob1010")
})

test('public gist create' ,async ({page})=>{
    
    // Click on the add gist button
    await page.locator('[class="octicon octicon-plus d-none d-md-inline-block"]').click()
   
   // Add Description
    await page.locator('[class="form-control input-block input-contrast"]').fill("Create gist from PlayWright")
   
   //Add filename
    await page.locator('[class="form-control js-gist-filename js-blob-filename"]').fill("PlayWright.txt")
    await page.keyboard.press("Enter")

    // Add Content
    await page.locator('.CodeMirror-line').fill("Gist Message")
    
    // Click on the Create gist dropdown
    await page.locator('[class="select-menu-button btn-primary btn BtnGroup-item float-none"]').click()
   
   // Select public gist 
    await page.locator('[class="select-menu-item"]').last().click()
    await page.getByText("Create public gist").first().click()  
    
})

test('secret gist create' ,async ({page})=>{
    
     // Click on the add gist button
    await page.locator('[class="octicon octicon-plus d-none d-md-inline-block"]').click()
    
    // Add Description
    await page.locator('[class="form-control input-block input-contrast"]').fill("Create gist from private PlayWright")
    
     //Add filename
    await page.locator('[class="form-control js-gist-filename js-blob-filename"]').fill("PrivatePlayWright.txt")
    await page.keyboard.press("Enter")

    // Add Content
    await page.locator('.CodeMirror-line').fill("Gist private Message")

    // Click on the Create gist dropdown
    await page.locator('[class="select-menu-button btn-primary btn BtnGroup-item float-none"]').click()

    // Select secret gist 
    await page.locator('[class="select-menu-item"]').first().click()
    await page.getByText("Create secret gist").first().click()
       
})

test('Gist Read User' ,async ({page})=>{
   
    // click on avatar
    await page.locator('[class="Header-item position-relative mr-0 d-none d-md-flex"]').locator('details').locator('img').click()

    //click on your gists
    await page.locator('.dropdown-item').first().click()

    //search and open the gist file 
    await page.getByText('PrivatePlayWright.txt').first().click()

    // Read the content of the file  to the constant
    const gistcontent=  await page.locator('#file-privateplaywright-txt-LC1').first().innerText()
    console.log(gistcontent)

    // assert the read content
    expect (gistcontent) .toEqual ("Gist private Message") 

})

test('Gist Delete private page' ,async ({page})=>{

    var deletegist = new DeleteGist(page);
    deletegist.delete("PrivatePlayWright.txt");
    //deletegist.delete("PlayWright.txt");
    
})


test('Gist Delete public page' ,async ({page})=>{

    var deletegist = new DeleteGist(page);
    deletegist.delete("PlayWright.txt");
    
})

test.afterEach( async ({page}) =>{

// click on avatar
//await page.locator('[class="Header-item position-relative mr-0 d-none d-md-flex"]').locator('details').locator('img').click()
await page.locator("//summary[@aria-label='View profile and more']//img[@alt='@kiranjacob1010']").click()

//click on signout
await page.locator('.logout-form').click()
//await page.locator('[class="dropdown-item dropdown-signout"]').first().click()


})
})
