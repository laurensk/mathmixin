using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Mathmixin.Server.Entities.Base;

namespace Mathmixin.Server.Entities;

public class Page : BaseEntity
{
    public long PageId { get; set; }

    public long NotebookId { get; set; }

    public Notebook Notebook { get; set; }

    [Required] public string Title { get; set; }

    [JsonIgnore] public string HtmlContent { get; set; }
}