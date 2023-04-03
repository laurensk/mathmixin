using System.Text.Json.Serialization;

namespace Mathmixin.Server.Entities.Base;

public abstract class BaseEntity
{
    public DateTime CreatedDateUtc { get; set; }

    public DateTime ModifiedDateUtc { get; set; }

    [JsonIgnore] public DateTime? DeletedDateUtc { get; set; }
}