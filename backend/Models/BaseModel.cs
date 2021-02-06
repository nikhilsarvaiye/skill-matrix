namespace Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    
    public class BaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // Example usage of BsonElement
        // [BsonElement("Name")]
        // public string BookName { get; set; }
    }
}
