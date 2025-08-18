// This data loads from individual JSON files
// Shows are stored as separate JSON files for easier management

import show1 from './ludo-comedy-night-1.json';
import show2 from './ludo-comedy-night-2.json';

export const shows = [
  show1,
  show2
];

export function getShowById(id) {
  return shows.find(show => show.id === id);
}

export function getUpcomingShows() {
  const now = new Date();
  return shows
    .filter(show => new Date(show.date) > now && show.status === 'EventScheduled')
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}