export enum AlertType {
  danger,
  primary,
  warning
}

export interface GroupNotificationPayload {
  message: string;
  alertType: AlertType;
}