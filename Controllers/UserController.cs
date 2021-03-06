using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System;


namespace msgHub.Controllers
{
  [ApiController]
  [Route("[controller]/[action]")]
  public class UserController : Controller
  {
    private readonly IMsgHubApplication _appContext;
    private IHubContext<MsgHub> _hubContext;

    public UserController(IMsgHubApplication appContext, IHubContext<MsgHub> hubcontext)
    {
      _appContext = appContext;
      _hubContext = hubcontext;
    }

    [HttpPost]
    public async Task<IActionResult> Login(string username, string whiteBoardName, string connectionId)
    {
      try
      {
        await _appContext.LogInUser(username);
        await _hubContext.Groups.AddToGroupAsync(connectionId, whiteBoardName);
        var payload = new UserLoggedInPayload { UserName = username, DateTime = DateTime.Now };
        await _hubContext.Clients.Group(whiteBoardName).SendAsync("userLoggedIn", payload);
        return Ok();
      }
      catch
      {
        return NotFound();
      }
    }

    [HttpPost]
    public async Task<IActionResult> Logout(string username, string whiteBoardName, string connectionId)
    {
      try
      {
        await _appContext.LogOutUser(username);
        await _hubContext.Groups.AddToGroupAsync(connectionId, whiteBoardName);
        await _hubContext.Clients.Group(whiteBoardName).SendAsync("groupNotification", username + " just left...");
        return Ok();
      }
      catch
      {
        return NotFound();
      }
    }
  }
}