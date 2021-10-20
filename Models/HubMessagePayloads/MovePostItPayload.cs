using System;
namespace msgHub
{
  public class MovePostItPayload
  {
    public int x { get; set; }
    public int y { get; set; }
    public string PostItId { get; set; }
  }
}