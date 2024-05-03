export function addSpaceSeriesTitle(str: string) {
  return str.replace(/([a-z])(?=[0-9])|(?<=[a-z])(?=[A-Z])/g, "$1 ").trim();
}
