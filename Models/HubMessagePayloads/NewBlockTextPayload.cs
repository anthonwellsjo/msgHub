using System;
namespace msgHub
{
  public class NewBlockTextPayloadFromClient
  {
    public string Author { get; set; }
    public string PostItId { get; set; }

  }
  public class NewBlockTextPayloadFromServer
  {
    public string Id { get; set; }
    public string Author { get; set; }
    public DateTime LastUpdatedOn { get; set; }
    public string PostItId { get; set; }
  }
}