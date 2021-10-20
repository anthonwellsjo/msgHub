  export enum TextFormat {
  underline,
  bold,
  overline
}

export interface Format {
  positions: number[];
  textFormat: TextFormat;
}