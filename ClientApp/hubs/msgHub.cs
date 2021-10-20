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

  }

}