export function toTitleCase([first, ...rest]: string) {
  return first.toUpperCase() + rest.join('').toLowerCase();
}
