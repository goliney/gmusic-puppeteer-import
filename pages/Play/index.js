const SearchInput = require('./components/SearchInput');
const SearchResults = require('./SearchResults');
const TopTracks = require('./TopTracks');
const TopTracksCluster = require('./components/TopTracksCluster');

class Play {
  constructor(page) {
    this.page = page;
    this.playMusicUrl = 'https://play.google.com/music/';

    this.components = {
      searchInput: new SearchInput(this.page),
      searchResults: new SearchResults(this.page),
      topTracks: new TopTracks(this.page),
      topTracksCluster: new TopTracksCluster(this.page),
    };
  }

  async goto() {
    await this.page.goto(this.playMusicUrl, { waitUntil: 'networkidle0' });
  }

  async search(query) {
    await this.components.searchInput.search(query);
    return this.components.searchResults.waitForResults();
  }

  async gotoArtist(artist) {
    const { artists } = await this.search(artist);
    if (!artists) {
      console.log(`NO SEARCH RESULTS: ${artist}`);
      return false;
    }
    return this.components.searchResults.gotoArtist(artist);
  }

  artistHasSongs() {
    return this.components.topTracksCluster.isPresent();
  }

  showAllSongs() {
    return this.components.topTracksCluster.showAll();
  }

  async addSongToPlaylist(title, playlist) {
    const songNames = await this.components.topTracks.getSongNames();
    const songIndex = songNames.indexOf(title.toLowerCase());
    if (songIndex === -1) {
      // song not found
      console.log(`NOT FOUND SONG: ${title}`);
      return false;
    }
    console.log(`FOUND SONG: ${title}`);

    await this.components.topTracks.showContextMenu(songIndex);
    const playlistNames = await this.components.topTracks.getPlaylistNames();
    const playlistIndex = playlistNames.indexOf(playlist);

    if (playlistIndex === -1) {
      // playlist not found
      return false;
    }

    await this.components.topTracks.addToPlaylist(playlistIndex);
    return true;
  }
}

module.exports = Play;
