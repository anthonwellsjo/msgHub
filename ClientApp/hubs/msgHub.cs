using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System;

namespace msgHub
{
  public class MsgHub : Hub
  {

    private readonly IMsgHubApplication _app;

    public MsgHub(IMsgHubApplication app) => _app = app;

    public async Task LogInUser(string username)
    {
      await Clients.Caller.SendAsync("userStatus", new { UserStatus = UserStatus.Pending, Request = "In Progress" });
      try
      {
        await _app.LogInUser(username);
        await Clients.Caller.SendAsync("userStatus", new { UserStatus = UserStatus.Online, Request = "Success" });
      }
      catch
      {
        await Clients.Caller.SendAsync("userStatus", new { UserStatus = UserStatus.Offline, Request = "Failed" });
      }
    }
    public async Task MovePostIt(MovePostItPayload payload, string groupName)
    {
      await Clients.Group(groupName).SendAsync("movePostIt", payload);
    }

    public async Task EditTextBlockText(EditTextBlockTextFromClient payload, string groupName)
    {
      await Clients.Group(groupName).SendAsync("editTextBlockText", payload);
    }
    public async Task DeleteTextBlock(DeleteTextBlockFromClient payload, string groupName)
    {
      await Clients.Group(groupName).SendAsync("deleteTextBlockFromClient", payload);
    }
    public async Task IsPostItMoving(IsPostItMovingFromClient payload, string groupName)
    {
      var data = new IsPostItMovingFromServer(payload);
      await Clients.Group(groupName).SendAsync("isPostItMoving", data);
    }
    public async Task TrashPostIt(TrashPostItFromClient payload, string groupName)
    {
      var data = new TrashPostItFromServer(payload);
      await Clients.Group(groupName).SendAsync("trashPostIt", data);
    }
    public async Task NewPostIt(NewPostItPayloadFromClient payload, string groupName)
    {
      var data = new NewPostItPayloadFromServer(payload);
      await Clients.Group(groupName).SendAsync("newPostIt", data);
    }
    public async Task EditPostItHeader(EditPostItHeaderFromClient payload, string groupName)
    {
      var data = new EditPostItHeaderFromServer(payload);
      await Clients.Group(groupName).SendAsync("editPostItHeader", data);
    }
  }
}