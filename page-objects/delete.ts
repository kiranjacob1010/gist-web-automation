import { Page } from "@playwright/test";

export class DeleteGist{
page:Page;
constructor(page:Page) {

    this.page= page;
}
async delete (gistname:string ) {
     // click on avatar
     await this.page.locator('[class="Header-item position-relative mr-0 d-none d-md-flex"]').locator('details').locator('img').click()

     //click on your gists
     await this.page.locator('.dropdown-item').first().click()
 
     //Search and open the gist 
     await this.page.getByText(gistname).first().click()
    
     // start the listener to handle the confirm dialog
     await this.page.on('dialog' , async (dialogbox) => {    
         dialogbox.accept() 
          
      })
    
        // click on delete button
      await this.page.getByLabel('Delete this Gist').last().click()
      //await this.page.waitForTimeout(2000)
     
}
}