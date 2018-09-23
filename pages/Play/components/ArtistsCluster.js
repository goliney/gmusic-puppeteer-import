class ArtistsCluster {
  constructor(page) {
    this.page = page;

    this.selectors = {
      container: '.cluster[data-type=srar]',
      artistCard: '.entity-card[data-type="artist"]',
      loadingOverlay: '#loading-overlay',
    };
  }

  async waitForContainer() {
    await this.page.waitForSelector(this.selectors.container);
  }

  getContainerElement() {
    return this.page.$(this.selectors.container);
  }

  async gotoArtist(artist) {
    await this.waitForContainer();

    // check if item is present on a page
    const artistNames = await this.getArtistNames();
    const matchIndex = artistNames.indexOf(artist.toLowerCase());
    if (matchIndex === -1) {
      console.log(`NOT FOUND ARTIST: ${artist}`);
      return false;
    }
    console.log(`FOUND ARTIST: ${artist}`);

    const navigationPromise = this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    await this.page.click(`${this.selectors.artistCard}:nth-child(${matchIndex + 1})`);
    await navigationPromise;
    await this.page.waitForSelector(this.selectors.loadingOverlay, { hidden: true });
    return true;
  }

  async getArtistNames() {
    const container = await this.page.$(this.selectors.container);
    const names = await container.$$eval(this.selectors.artistCard, nodes =>
      nodes.map(n => n.innerText.toLowerCase())
    );
    return names;
  }
}

module.exports = ArtistsCluster;
