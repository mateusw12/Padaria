export function formatTimeSpan(seconds: number): string {
  if (!Number.isFinite(seconds)) {
    seconds = 0;
  }

  let sign = '';
  if (seconds < 0) {
    seconds *= -1;
    sign = '-';
  }

  let totalMinutes = Math.floor(seconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes - (totalHours * 60);
  const totalSeconds = seconds - (totalMinutes * 60) - (totalHours * 60 * 60);

  const fixedHours = totalHours.toFixed(0).padStart(2, '0');
  const fixedMinutes = totalMinutes.toFixed(0).padStart(2, '0');
  const fixedSeconds = totalSeconds.toFixed(0).padStart(2, '0');

  return `${sign}${fixedHours}:${fixedMinutes}:${fixedSeconds}`;
}
