namespace Mathmixin.Server.Entities.Base;

public abstract class BaseEntity
{
    public DateTime CreatedDateUtc { get; set; }

    public DateTime ModifiedDateUtc { get; set; }

    public DateTime? DeletedDateUtc { get; set; }
}