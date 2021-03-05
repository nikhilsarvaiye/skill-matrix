namespace Models
{
    using System.Collections.Generic;

    public class SkillWeightages : BaseModel
    {
        public string Name { get; set; }
        
        public List<SkillWeightage> Skills { get; set; }
    }
}
