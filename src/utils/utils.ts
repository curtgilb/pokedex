export function getArtworkUrl(version: string, jsonString: string): string {
  if (jsonString) {
    const images = JSON.parse(jsonString);
    if ("other" in images) {
      const url = images.other[version].front_default.replace(
        "/media/",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/"
      );
      return url;
    }
  }
  return "";
}

export function toTitleCase(str: string | null | undefined) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function capitalize(word: string) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}
