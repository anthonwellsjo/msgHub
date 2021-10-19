using System.Threading.Tasks;

namespace msgHub
{
  public interface IMsgHubApplication
  {
    Task LogInUser(string User);
    Task LogOutUser(string User);
    Whiteboard GetWhiteBoard();
  }
}