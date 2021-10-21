using System;
namespace msgHub
{
  public class EditTextBlockTextFromClient
  {
    public string Value { get; set; }
    public string TextBlockId { get; set; }
    public string PostItId { get; set; }


  }
  public class EditTextBlockTextFromServer
  {
    public string Value { get; set; }
    public string TextBlockId { get; set; }
    public string PostItId { get; set; }
    public DateTime LastUpdatedOn { get; set; }

  }
}