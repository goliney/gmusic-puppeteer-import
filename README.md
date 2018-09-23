# gmusic-puppeteer-import
> Add songs to Google Play Music playlist

## Motivation

I had a list of ~1700 tracks that I wanted to save in a playlist on a Google Play Music, which is
a tedious work if you tried.

So I created a simple script based on [Puppeteer](https://github.com/GoogleChrome/puppeteer), that:

1. Reads a file with a list of songs
2. Signs into a Google account and goes to Google Play Music page
3. Tries to find an artist from a list
4. Tries to find a song of a given artist
5. Adds that song to a playlist
6. Moves on to the next song in a list

## How to use?

Script was used with node version 10. First, you need to install dependencies:
```
npm i
```
You will need to set following details in [`index.js`](https://github.com/goliney/gmusic-puppeteer-import/blob/master/index.js#L13-L17):
1. Email
2. Password
3. Playlist name (should exist)
4. Path to a text file with a list of songs

Then, run
```
node index.js
```
