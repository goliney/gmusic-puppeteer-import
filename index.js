const puppeteer = require('puppeteer');
const Accounts = require('./pages/Accounts');
const Play = require('./pages/Play');
const fs = require('fs');

/*
Dataset Format:
[
  ['Artist', 'Song name'],
  ...
]
*/
const dataset = JSON.parse(fs.readFileSync('./path-to-your-dataset.txt', 'utf8'));

const email = 'your-email@gmail.com';
const password = 'your-password';
const playlist = 'your-playlist-name';

const results = { found: [], notfound: [] };

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  // sign in
  const accounts = new Accounts(page);
  await accounts.goto();
  await accounts.signIn(email, password);

  const play = new Play(page);

  for (const song of dataset) {
    const [artist, title] = song;
    await play.goto(); // start search from blank

    const foundArtist = await play.gotoArtist(artist);
    if (!foundArtist) {
      results.notfound.push(song);
      continue;
    }

    const artistHasSongs = await play.artistHasSongs();
    if (!artistHasSongs) {
      console.log(`ARTIST HAS NO SONGS: ${artist}`);
      results.notfound.push(song);
      continue;
    }

    await play.showAllSongs();
    const foundSong = await play.addSongToPlaylist(title, playlist);
    if (!foundSong) {
      results.notfound.push(song);
      continue;
    }

    console.log(`Added ${artist} - ${title}`);
    results.found.push(song);
  }

  console.log(`Found: ${results.found.length}; Not found: ${results.notfound.length}`);
  browser.close();
})();
