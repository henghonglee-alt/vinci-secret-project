export const archiveData = [
  {
    id: 1,
    date: '2026-03-26',
    title: 'The beginning',
    tag: 'memory',
    password: 'firsthello',
    hint: 'Your real clue will be handwritten on the back of the photo.',
    image: './assets/day-01.svg',
    text: [
      'This is a placeholder entry so you can see how the journey works.',
      'When you send me the real photos and words, I’ll swap these out cleanly.'
    ],
    link: ''
  },
  {
    id: 2,
    date: '2026-03-27',
    title: 'Little things',
    tag: 'note',
    password: 'tinythings',
    hint: 'Placeholder hint.',
    image: './assets/day-02.svg',
    text: [
      'Another sample day. Previous days remain accessible, future days stay locked.',
      'You can use this slot for a memory, something you love about him, or a song link.'
    ],
    link: 'https://open.spotify.com/'
  },
  {
    id: 3,
    date: '2026-03-28',
    title: 'A small secret',
    tag: 'secret',
    password: 'pinkmoon',
    hint: 'Placeholder hint.',
    image: './assets/day-03.svg',
    text: [
      'This demo entry shows the same structure for every day.',
      'The site is ready for you to feed in the real content later.'
    ],
    link: ''
  },
  {
    id: 4,
    date: '2026-03-29',
    title: 'A song for today',
    tag: 'song',
    password: 'ourtune',
    hint: 'Placeholder hint.',
    image: './assets/day-04.svg',
    text: [
      'Use this slot for a song and a paragraph about why it matters.',
      'The visual style stays romantic, minimal, and a bit doodly.'
    ],
    link: 'https://www.youtube.com/'
  },
  {
    id: 5,
    date: '2026-03-30',
    title: 'Future placeholder',
    tag: 'future',
    password: 'comingsoon',
    hint: 'Placeholder hint.',
    image: './assets/day-05.svg',
    text: [
      'The rest of the range will be generated from one template until you send the real content.',
      'So yes — I am building the engine now, not waiting for all the final copy first.'
    ],
    link: ''
  }
];

const start = new Date('2026-03-31T00:00:00');
const end = new Date('2026-04-30T00:00:00');
let id = 6;
for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
  const date = d.toISOString().slice(0, 10);
  archiveData.push({
    id,
    date,
    title: `Placeholder for day ${id}`,
    tag: id % 2 === 0 ? 'memory' : 'note',
    password: `day${String(id).padStart(2, '0')}`,
    hint: 'Placeholder hint.',
    image: `./assets/day-${String(((id - 1) % 5) + 1).padStart(2, '0')}.svg`,
    text: [
      `This is placeholder content for ${date}.`,
      'Replace me with the real photo, clue, password, and message when you are ready.'
    ],
    link: ''
  });
  id += 1;
}
