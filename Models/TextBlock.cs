using System;
namespace msgHub
{
  public class TextBlock
  {
        public string Id{get;set;}
        public string Text{get;set;}
        public string Author{get;set;}
        public DateTime LastUpdated{get;set;}
        public Format[] Formatting{get;set;}

  }

}