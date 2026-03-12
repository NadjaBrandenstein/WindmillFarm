namespace DataAccess.Repositories;

public interface IRepository<T>
{
    IQueryable<T> Query();
    Task Add(T entity);
}