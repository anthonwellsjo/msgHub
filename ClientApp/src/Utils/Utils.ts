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

export const GetRandomColor = (i: number) => {
  switch (i) {
    case 0: return "#FFCAB1"
    case 1: return "#ECDCB0"
    case 2: return "#C1D7AE"
    case 3: return "#FFD3BA"
    case 4: return "#FBFFF1"
    case 5: return "#F4F4ED"
  }

  return "green";
}