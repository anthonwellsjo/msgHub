import { AlertType } from "../Types/alertType";


export const tempWhiteBoardName = "redrum";

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

export const GetRandomColor: (i: number) => string = (i) => {
  switch (i) {
    case 0: return "rgba(209, 245, 255, 0.3)";
    case 1: return "rgba(217, 249, 165, 0.3)";
    case 2: return "rgba(229, 164, 203, 0.3)";
    case 3: return "rgba(148, 168, 154, 0.3)";
    case 4: return "rgba(247, 249, 249, 0.3)";
    case 5: return "rgba(253, 231, 76, 0.3)";
    default: {
      const color = GetRandomColor(Math.floor(Math.random() * 5));
      return color;
    }
  }

  return "green";
}