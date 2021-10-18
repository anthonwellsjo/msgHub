using System;
namespace msgHub
{
  class PostIt
  {
    public string ID{get;set;}
    public string Header{get;set;}
    public TextBlock[] Body{get;set;}
    public PostItPosition Position{get;set;}
    public string CreatedBy{get;set;}
    public DateTime CreatedOn{get;set;}


  }

}