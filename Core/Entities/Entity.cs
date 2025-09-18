namespace Core.Entities;

public interface IEntity {
    Guid Id { get; }
}

public abstract class Entity : IEntity {
    public Guid Id { get; init; }

    protected Entity() {
        Id = Guid.NewGuid();
    }

    protected Entity(Guid id) {
        Id = id;
    }
}
