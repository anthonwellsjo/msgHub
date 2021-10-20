import { AlertType } from "../Types/alertType";


export const whiteBoardName = "redrum";

const names = [
  "rumstump", "fiskbert", "slasktratt", "regnhus", "lingonflinga", "fisksenap", "fiskgrönsak", "hjort", "splitter", "spacka", "aieie"
]

export const randomName = () => {

  return names[Math.floor(Math.random() * names.length)];
}

export const GetAlertColor = (type: AlertType) => {
  switch (type) {
    case AlertType.primary: {
      return "lightgreen"
    }
    case AlertType.danger: {
      return "lightred"
    }
    case AlertType.warning: {
      return "orange"
    }
  }
}