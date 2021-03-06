using System.Threading.Tasks;

namespace msgHub
{
  public interface IMsgHubApplication
  {
    Task LogInUser(string User);
    Task LogOutUser(string User);
    Task AddBlockText(NewBlockTextPayloadFromServer data);
    Task<Whiteboard> GetWhiteBoard();
  }
}