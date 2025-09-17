namespace Core.Entities;
public abstract class Entity {
    public Guid Id { get; init; }

    protected Entity() {
        Id = Guid.NewGuid();
    }

    protected Entity(Guid id) {
        Id = id;
    }
}
