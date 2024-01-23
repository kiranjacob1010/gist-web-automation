import { Page } from "@playwright/test";

export class LoginPage{
page:Page;
constructor(page:Page) {

    this.page= page;
}
async login (username:string ,password: string) {
    await this.page.goto("https://gist.github.com/")
    await this.page.locator('[class="Header-link no-underline mr-3"]').click()
    await this.page.locator('#login_field').fill(username)
    await this.page.locator('#password').fill(password)
    await this.page.locator('[class="btn btn-primary btn-block js-sign-in-button"]').click()

}

 logout () {
    var aa =  this.page.locator('[class="Header-item position-relative mr-0 d-none d-md-flex"]').locator('details').locator('img')
    this.page.waitForTimeout(3000)
    aa.click()
     this.page.locator('.logout-form').click()
}

}