namespace Configuration.Options.Abstractions
{
    public interface IDbOptions
    {
        string ConnectionString { get; set; }

        string DatabaseName { get; set; }
    }
}
