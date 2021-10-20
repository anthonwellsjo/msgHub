using System;


namespace msgHub
{
  public class Whiteboard
  {
    public string Id { get; set; }
    public PostIt[] Postits { get; set; }
    public DateTime CreatedOn { get; set; }
    public string CreatedBy { get; set; }
  }

}