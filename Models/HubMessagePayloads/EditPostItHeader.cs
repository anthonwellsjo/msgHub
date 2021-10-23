using System;
namespace msgHub
{
  public class EditPostItHeaderFromClient
  {
    public string Value { get; set; }
    public string PostItId { get; set; }


  }
  public class EditPostItHeaderFromServer
  {
    public EditPostItHeaderFromServer(EditPostItHeaderFromClient editPostItHeaderFromClient)
    {
      Value = editPostItHeaderFromClient.Value;
      PostItId = editPostItHeaderFromClient.PostItId;
    }
    public string Value { get; set; }
    public string PostItId { get; set; }
  }
}