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
