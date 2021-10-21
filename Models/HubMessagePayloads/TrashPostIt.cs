using System;
namespace msgHub
{
  public class TrashPostItFromClient
  {
    public string PostItId { get; set; }
    public string User { get; set; }

  }
  public class TrashPostItFromServer
  {
    public TrashPostItFromServer(TrashPostItFromClient trashPostItFromClient){
      PostItId = trashPostItFromClient.PostItId;
      User = trashPostItFromClient.User;
      TrashedOn = DateTime.Now;
    }
    public string PostItId { get; set; }
    public string User { get; set; }
    public DateTime TrashedOn { get; set; }

  }
}