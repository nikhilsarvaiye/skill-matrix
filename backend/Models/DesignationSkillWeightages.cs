namespace Models
{
    public class DesignationSkillWeightages : BaseModel
    {
        public SkillWeightageType Type { get; set; }

        public string DesignationId { get; set; }

        public string DesignationName { get; set; }

        public string UserId { get; set; }

        public string UserName { get; set; }

        public string SkillWeightagesId { get; set; }

        public string SkillWeightagesName { get; set; }
    }
}
