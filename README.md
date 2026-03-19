# The Archive of Us

A lightweight static web app for a daily romantic unlock journey.

## Current behavior
- First thing shown is today's card
- Only today's card and previous days are accessible
- Every card requires a password
- Once unlocked, that day stays open
- Future days stay locked
- Mobile-first design with soft romantic minimalist styling

## Where to edit content
Edit `src/data.js`.

For each entry:
- `date`: unlock date in `YYYY-MM-DD`
- `title`: card title
- `tag`: memory / note / song / secret / etc.
- `password`: the expected answer
- `hint`: optional line shown in the unlock modal
- `image`: local image path
- `text`: array of paragraphs
- `link`: optional bonus link

## Next content pass
Once Vinci uploads the real photos and text in chat, replace the placeholder entries and images.
