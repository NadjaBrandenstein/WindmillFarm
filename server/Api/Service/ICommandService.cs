
public interface ICommandService
{
    Task SendCommandAsync(string turbineId, TurbineCommandDto command);
}