namespace Mathmixin.Server.Models;

public class ContentModel
{
    public string Content { get; set; }

    public ContentModel(string content)
    {
        Content = content;
    }
}