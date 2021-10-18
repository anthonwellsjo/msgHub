using System;
namespace msgHub
{
  class TextBlock
  {
        public string ID{get;set;}
        public string Text{get;set;}
        public string Author{get;set;}
        public DateTime LastUpdated{get;set;}
        public Format[] Formatting{get;set;}

  }

}