using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace msgHub
{

  class MsgHubController : Controller
  {
    private readonly IMsgHubApplication _app;

    public MsgHubController(IMsgHubApplication app) => _app = app;


    [Route("get-whiteboard/{id:int}")]
    public ActionResult<Whiteboard> GetWhiteBoard(int id) => _app.GetWhiteBoard();

  }
}