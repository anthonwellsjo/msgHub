using System;
namespace msgHub
{
  public class IsPostItMovingFromClient
  {
    public bool Value { get; set; }
    public string PostItId { get; set; }


  }
  public class IsPostItMovingFromServer
  {
    public IsPostItMovingFromServer(IsPostItMovingFromClient isPostItMovingFromClient)
    {
      Value = isPostItMovingFromClient.Value;
      PostItId = isPostItMovingFromClient.PostItId;
    }
    public bool Value { get; set; }
    public string PostItId { get; set; }

  }
}