using System;
namespace msgHub
{

  public enum AlertType
  {
    danger, primary, warning
  }
  public class GroupNotificationPayload
  {
    public string Message { get; set; }
    public AlertType AlertType { get; set; }
  }
}