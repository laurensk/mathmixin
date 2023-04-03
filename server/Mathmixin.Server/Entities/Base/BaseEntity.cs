using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Mathmixin.Server.Entities.Base;

public abstract class BaseEntity
{
    [Column(TypeName = "datetime(0)")] public DateTime CreatedDateUtc { get; set; }

    [Column(TypeName = "datetime(0)")] public DateTime ModifiedDateUtc { get; set; }

    [Column(TypeName = "datetime(0)")]
    [JsonIgnore]
    public DateTime? DeletedDateUtc { get; set; }
}