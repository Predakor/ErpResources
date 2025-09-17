namespace Core.Abstractions.Resources;
public interface IResourceAccesService {
    Task<bool> CanAccessAsync<TResource>(ResourceOperation<TResource> resource);
}
