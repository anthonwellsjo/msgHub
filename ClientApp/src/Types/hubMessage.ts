import { GroupNotificationPayload } from "./groupNotification";

type eventName = "GroupNotification"

export interface HubMessage {
  eventName: eventName;
  payload: GroupNotificationPayload | string;
}