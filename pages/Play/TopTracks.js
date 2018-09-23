class TopTracks {
  constructor(page) {
    this.page = page;

    this.selectors = {
      container: '.songlist-container',
      songRow: '.song-row',
      songTitle: '[data-col="title"] .column-content',
      songMenu: '.song-menu',
      addToPlaylistMenuItem: '.goog-submenu', // yeah, it's weak id
      playlistMenu: '.playlist-menu',
      playlistMenuItem: '.goog-menuitem',
    };
  }

  async getSongNames() {
    await this.page.waitForSelector(this.selectors.container);
    const container = await this.page.$(this.selectors.container);
    const names = await container.$$eval(
      `${this.selectors.songRow} ${this.selectors.songTitle}`,
      nodes => nodes.map(n => n.innerText.toLowerCase())
    );
    return names;
  }

  async showContextMenu(index) {
    const selector = `${this.selectors.songRow}[data-index="${index}"] ${this.selectors.songTitle}`;
    await this.page.hover(selector);
    await this.page.click(selector, { button: 'right' });
    await this.page.waitForSelector(this.selectors.songMenu);
    await this.page.click(`${this.selectors.songMenu} ${this.selectors.addToPlaylistMenuItem}`);
    await this.page.waitForSelector(this.selectors.playlistMenu);
  }

  async getPlaylistNames() {
    const container = await this.page.$$(this.selectors.playlistMenu); // there are two playlist menus
    const names = await container
      .pop()
      .$$eval(this.selectors.playlistMenuItem, nodes => nodes.map(n => n.innerText));
    return names;
  }

  async addToPlaylist(index) {
    const container = await this.page.$$(this.selectors.playlistMenu);
    await container.pop().click(`${this.selectors.playlistMenuItem}:nth-child(${index + 1})`);
    await this.page.waitFor(1000); // if song is in playlist, we ignore that
  }
}

module.exports = TopTracks;
