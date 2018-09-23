const ArtistsCluster = require('./components/ArtistsCluster');

class SearchResults {
  constructor(page) {
    this.page = page;

    this.selectors = {
      container: '.search-view',
      noResults: '.empty-message',
    };

    this.components = {
      artistsCluster: new ArtistsCluster(page),
    };
  }

  async waitForResults() {
    await this.page.waitForFunction(
      (noResults, searchView) =>
        !!document.querySelector(noResults) || !!document.querySelector(searchView),
      {},
      this.selectors.noResults,
      this.selectors.container
    );
    const artists = await this.components.artistsCluster.getContainerElement();

    return { artists: !!artists };
  }

  gotoArtist(artist) {
    return this.components.artistsCluster.gotoArtist(artist);
  }
}

module.exports = SearchResults;
