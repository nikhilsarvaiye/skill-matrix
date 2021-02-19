namespace Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    using System;
    using System.ComponentModel.DataAnnotations;

    public class BaseModel
    {
        [Key]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // [BsonElement("timestamp")] // use the abbreviation in serialization
        // public BsonTimestamp TimeStamp { get; set; } = BsonTimestamp.Create(DateTime.Now);

        // Example usage of BsonElement
        // [BsonElement("Name")]
        // public string BookName { get; set; }
    }
}
