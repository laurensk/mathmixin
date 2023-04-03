using System.ComponentModel.DataAnnotations;
using Mathmixin.Server.Entities.Base;

namespace Mathmixin.Server.Entities;

public class Notebook : BaseEntity
{
    public long NotebookId { get; set; }

    [Required] public string Name { get; set; }
}