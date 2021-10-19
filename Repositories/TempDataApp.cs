using System;
using System.Threading.Tasks;


namespace msgHub
{
  class TempDataApp : IMsgHubApplication
  {
    public async Task LogInUser(string User)
    {
      await Task.Delay(500);
      return;
    }
    public async Task LogOutUser(string User)
    {
      await Task.Delay(500);
      return;
    }
    public async Task<Whiteboard> GetWhiteBoard()
    {
      await Task.Delay(500);

      var post1 = new PostIt()
      {
        ID = Guid.NewGuid().ToString(),
        Header = "Dirty sheets in room 12!",
        Body = new TextBlock[]{
          new TextBlock(){
            ID = Guid.NewGuid().ToString(),
            Author = "John",
            Text = "I couldn't change them yesterday because something...",
            Formatting = new Format[] {
              new Format() { Positions = new int[] { 2, 3, 4, 5, 6, 7, 8, 9 }, TextFormat = TextFormat.bold },
              },
            LastUpdated= new DateTime(2020,09,28,16,05,25),
          },
          new TextBlock(){
            ID = Guid.NewGuid().ToString(),
            Author = "Teresa",
            Text = "Ok done!",
            Formatting = new Format[] {
              new Format() { Positions = new int[] { 0,1,3,4,5,6 }, TextFormat = TextFormat.underline },
              },
            LastUpdated= new DateTime(2020,09,29,10,05,25),
          },
        },
        Position = new PostItPosition()
        {
          IsMoving = false,
          X = 255,
          Y = 200
        },
        CreatedBy = "John",
        CreatedOn = new DateTime(2020, 09, 28, 16, 05, 25)
      };


      var post2 = new PostIt()
      {
        ID = Guid.NewGuid().ToString(),
        Header = "Monkey loose!",
        Body = new TextBlock[]{
          new TextBlock(){
            ID = Guid.NewGuid().ToString(),
            Author = "Liza",
            Text = "It's in the kitchen eating bananas.",
            Formatting = new Format[] {
              new Format() { Positions = new int[] { 12, 13, 14, 15, 16, 17, 18}, TextFormat = TextFormat.bold },
              },
            LastUpdated= new DateTime(2020,09,28,10,15,45),
          },
          new TextBlock(){
            ID = Guid.NewGuid().ToString(),
            Author = "Tom",
            Text = "That's weird. I closed him in his cage yesterday night.",
            LastUpdated= new DateTime(2020,09,28,18,05,25),
          },
        },
        Position = new PostItPosition()
        {
          IsMoving = false,
          X = 255,
          Y = 200
        },
        CreatedBy = "John",
        CreatedOn = new DateTime(2020, 09, 28, 16, 05, 25)
      };

      var board = new Whiteboard()
      {
        Postits = new PostIt[]{
          post1,post2
        },
        CreatedBy = "Lyret",
        CreatedOn = new DateTime(2020, 09, 01, 10, 25, 05)
      };

      return board;
    }
  }

}