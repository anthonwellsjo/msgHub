using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System;

namespace msgHub
{
  class msgHub : Hub
  {
    public async Task NewMessage(long username, string message)
    {
      Console.WriteLine(username.ToString(), message);
      await Clients.All.SendAsync("messageReceived", username, message);
    }
  }

}