import {test , expect} from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage';


test.beforeEach( async ({page}) =>{
       
    // open the browser
   await page.goto("https://gist.github.com/")    
    var loginpage = new LoginPage(page)
    loginpage.login("kiranjacob1010@gmail.com" , "Sacretheart@2024")

} )

test('Gist Read User' ,async ({page})=>{
   
    await page.locator('[class="Header-item position-relative mr-0 d-none d-md-flex"]').locator('details').locator('img').click()
    await page.locator('.dropdown-item').first().click()
    //large data test 
    await page.getByText(" gistTest").first().click()
    await page.locator('[class="file-actions flex-order-2 pt-0"]').click()   

})