class SearchInput {
  constructor(page) {
    this.page = page;
    this.selectors = {
      searchInput: 'input#input',
    };
  }

  async search(query) {
    await this.page.type(this.selectors.searchInput, query);
    const navigationPromise = this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    await this.page.keyboard.press(String.fromCharCode(13)); // Enter
    await navigationPromise;
  }
}

module.exports = SearchInput;
