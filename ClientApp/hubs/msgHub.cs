using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System;

namespace msgHub
{
  class MsgHub : Hub
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
    public async Task LogOutUser(string username)
    {
      await Clients.Caller.SendAsync("userStatus", new { UserStatus = UserStatus.Pending, Request = "In Progress" });
      try
      {
        await _app.LogOutUser(username);
        await Clients.Caller.SendAsync("userStatus", new { UserStatus = UserStatus.Offline, Request = "Success" });
      }
      catch
      {
        await Clients.Caller.SendAsync("userStatus", new { UserStatus = UserStatus.Online, Request = "Failed" });
      }
    }
    public async Task GetWhiteBoard(string username)
    {
      var board = _app.GetWhiteBoard();
        await Clients.Caller.SendAsync("getWhiteBoard", board);
    }

  }

}