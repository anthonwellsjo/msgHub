export const whiteBoardName = "redrum";

const names = [
  "rumstump", "fiskbert", "slasktratt", "regnhus", "lingonflinga", "fisksenap", "fiskgrönsak", "hjort", "splitter", "spacka", "aieie"
]

export const randomName = () => {

  return names[Math.floor(Math.random() * names.length)];
}