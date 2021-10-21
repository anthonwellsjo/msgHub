using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

using System;

namespace msgHub.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class PostItController : Controller
  {
    private readonly IMsgHubApplication _appContext;
    private IHubContext<MsgHub> _hubContext;


    public PostItController(IMsgHubApplication appContext, IHubContext<MsgHub> hubcontext)
    {
      _appContext = appContext;
      _hubContext = hubcontext;
    }

    [HttpPost]
    [Route("textblock")]

    public async Task<IActionResult> Post(NewBlockTextPayloadFromClient payload, string whiteboardName)
    {
      try
      {
        var block = new NewBlockTextPayloadFromServer
        {
          PostItId = payload.PostItId,
          Author = payload.Author,
          Id = Guid.NewGuid().ToString(),
          LastUpdatedOn = DateTime.Now
        };
        await _appContext.AddBlockText(block);
        await _hubContext.Clients.Group(whiteboardName).SendAsync("newBlockText", block);
        return Ok();
      }
      catch
      {
        return NotFound();
      }
    }

  }
}