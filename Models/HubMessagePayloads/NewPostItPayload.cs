using System;
namespace msgHub
{
  public class NewPostItPayloadFromClient
  {
    public PostItPosition Position { get; set; }
    public string CreatedBy { get; set; }

  }
  public class NewPostItPayloadFromServer
  {
    public NewPostItPayloadFromServer(NewPostItPayloadFromClient newPostItPayloadFromClient)
    {
      Id = Guid.NewGuid().ToString();
      Header = "";
      Body = new TextBlock[] { };
      Position = newPostItPayloadFromClient.Position;
      CreatedBy = newPostItPayloadFromClient.CreatedBy;
      CreatedOn = DateTime.Now;
    }
    public string Id { get; set; }
    public string Header { get; set; }
    public TextBlock[] Body { get; set; }
    public PostItPosition Position { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
  }
}