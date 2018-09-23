class Accounts {
  constructor(page) {
    this.page = page;
    this.signInUrl = 'https://accounts.google.com/signin';
    this.selectors = {
      emailInput: '#identifierId',
      emailNextButton: '#identifierNext',
      passwordInput: '[type=password]:focus',
      passwordNextButton: '#passwordNext'
    };
  }

  async goto() {
    await this.page.goto(this.signInUrl, { waitUntil: 'networkidle0' });
  }

  async signIn(email, password) {
    // type email
    await this.page.type(this.selectors.emailInput, email);
    await this.page.click(this.selectors.emailNextButton);

    // type password
    await this.page.waitFor(this.selectors.passwordInput);
    const navigationPromise = this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    await this.page.type(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.passwordNextButton);

    // wait for login to happen
    await navigationPromise;
  }
}

module.exports = Accounts;
