using System;
namespace msgHub
{
  public enum TextFormat
  {
    underline,
    bold,
    overline
  }
  public class Format
  {
    public int[] Positions { get; set; }
    public TextFormat TextFormat { get; set; }
  }

}