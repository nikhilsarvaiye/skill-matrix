namespace Configuration.Options
{
    using Abstractions;
    
    public class MongoDbOptions : IDbOptions
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }
    }
}
