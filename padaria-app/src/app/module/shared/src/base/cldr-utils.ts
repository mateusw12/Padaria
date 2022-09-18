export function getMomentFormat(format: string): string {
  return format.replace(/d/g, 'D').replace(/y/g, 'Y');
}
