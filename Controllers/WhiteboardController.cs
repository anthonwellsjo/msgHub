using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

using System;

namespace msgHub.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WhiteboardController : Controller
  {
    private readonly IMsgHubApplication _appContext;

    public WhiteboardController(IMsgHubApplication appContext, IHubContext<MsgHub> hubcontext)
    {
      _appContext = appContext;
    }

    [HttpGet]
    public async Task<Whiteboard> Get(string id)
    {
      var board = await _appContext.GetWhiteBoard();
      return board;
    }

  }
}