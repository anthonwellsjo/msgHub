using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace msgHub.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WhiteboardController : Controller
  {
    private readonly IMsgHubApplication _app;

    public WhiteboardController(IMsgHubApplication app) => _app = app;

    [HttpGet]
    public ActionResult<Whiteboard> Get(string id)
    {
      var board = _app.GetWhiteBoard();
      Console.WriteLine(id);
      return board;
    }


  }
}