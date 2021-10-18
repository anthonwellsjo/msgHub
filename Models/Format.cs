using System;
namespace msgHub
{
  enum TextFormat
  {
    underline,
    bold,
    overline
  }
  class Format
  {
    public int[] Positions { get; set; }
    public TextFormat TextFormat { get; set; }
  }

}