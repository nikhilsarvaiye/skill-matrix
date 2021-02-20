namespace Models
{
    public class Skill : BaseModel
    {
        public string Name { get; set; }

        public string ParentSkillId { get; set; }

        public virtual string ParentSkillName { get; set; }
    }
}
