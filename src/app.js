import { archiveData } from './data.js';

const todayPanelTitle = document.getElementById('today-title');
const todayPanelDescription = document.getElementById('today-description');
const openTodayButton = document.getElementById('open-today-button');
const progressText = document.getElementById('progress-text');
const availableText = document.getElementById('available-text');
const cardGrid = document.getElementById('card-grid');

const unlockDialog = document.getElementById('unlock-dialog');
const contentDialog = document.getElementById('content-dialog');
const unlockForm = document.getElementById('unlock-form');
const closeDialog = document.getElementById('close-dialog');
const cancelButton = document.getElementById('cancel-button');
const closeContent = document.getElementById('close-content');
const dialogImage = document.getElementById('dialog-image');
const dialogDayLabel = document.getElementById('dialog-day-label');
const dialogTitle = document.getElementById('dialog-title');
const dialogHint = document.getElementById('dialog-hint');
const passwordInput = document.getElementById('password-input');
const passwordFeedback = document.getElementById('password-feedback');

const contentImage = document.getElementById('content-image');
const contentDayLabel = document.getElementById('content-day-label');
const contentTitle = document.getElementById('content-title');
const contentTag = document.getElementById('content-tag');
const contentText = document.getElementById('content-text');
const contentLink = document.getElementById('content-link');

const STORAGE_KEY = 'archive-of-us-unlocked';
const unlockedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

const urlDate = new URLSearchParams(window.location.search).get('previewDate');
const computedToday = new Date().toISOString().slice(0, 10);
const today = urlDate || computedToday;
let selectedEntry = null;

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'short'
  });
}

function dayLabel(entry) {
  return `Day ${entry.id}`;
}

function isAvailable(entry) {
  return entry.date <= today;
}

function saveUnlocks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedIds]));
}

function renderCards() {
  cardGrid.innerHTML = '';
  archiveData.forEach((entry) => {
    const button = document.createElement('button');
    button.className = 'card-tile';
    if (!isAvailable(entry)) button.classList.add('is-future');
    if (entry.date === today) button.classList.add('is-today');
    if (unlockedIds.has(entry.id)) button.classList.add('is-unlocked');

    button.innerHTML = `
      <img class="card-tile__image" src="${entry.image}" alt="${entry.title}" />
      <div class="card-tile__meta">
        <p class="card-tile__day">${dayLabel(entry)}</p>
        <p class="card-tile__title">${entry.title}</p>
        <p class="card-tile__date">${formatDate(entry.date)}</p>
      </div>
    `;

    button.addEventListener('click', () => handleTileClick(entry));
    cardGrid.appendChild(button);
  });

  const availableCount = archiveData.filter(isAvailable).length;
  progressText.textContent = `${unlockedIds.size} unlocked`;
  availableText.textContent = `${availableCount} cards`;
}

function setTodayPanel() {
  const todayEntry = archiveData.find((entry) => entry.date === today) || archiveData[0];
  todayPanelTitle.textContent = todayEntry.title;
  todayPanelDescription.textContent = `${dayLabel(todayEntry)} • ${formatDate(todayEntry.date)} • ${todayEntry.tag}`;
  openTodayButton.onclick = () => handleTileClick(todayEntry);
}

function handleTileClick(entry) {
  if (!isAvailable(entry)) return;
  if (unlockedIds.has(entry.id)) {
    openContent(entry);
    return;
  }

  selectedEntry = entry;
  dialogImage.src = entry.image;
  dialogDayLabel.textContent = `${dayLabel(entry)} • ${formatDate(entry.date)}`;
  dialogTitle.textContent = entry.title;
  dialogHint.textContent = entry.hint || 'The clue is on the back of your physical card.';
  passwordInput.value = '';
  passwordFeedback.textContent = '';
  unlockDialog.showModal();
}

unlockForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!selectedEntry) return;

  const submitted = passwordInput.value.trim().toLowerCase();
  if (submitted === selectedEntry.password.trim().toLowerCase()) {
    unlockedIds.add(selectedEntry.id);
    saveUnlocks();
    unlockDialog.close();
    renderCards();
    openContent(selectedEntry);
  } else {
    passwordFeedback.textContent = 'Not quite. Try again.';
  }
});

function openContent(entry) {
  contentImage.src = entry.image;
  contentDayLabel.textContent = `${dayLabel(entry)} • ${formatDate(entry.date)}`;
  contentTitle.textContent = entry.title;
  contentTag.textContent = entry.tag;
  contentText.innerHTML = entry.text.map((paragraph) => `<p>${paragraph}</p>`).join('');

  if (entry.link) {
    contentLink.href = entry.link;
    contentLink.classList.remove('hidden');
    contentLink.textContent = entry.tag === 'song' ? 'Open bonus link' : 'Open extra';
  } else {
    contentLink.classList.add('hidden');
  }

  contentDialog.showModal();
}

[closeDialog, cancelButton].forEach((button) => button.addEventListener('click', () => unlockDialog.close()));
closeContent.addEventListener('click', () => contentDialog.close());

setTodayPanel();
renderCards();
