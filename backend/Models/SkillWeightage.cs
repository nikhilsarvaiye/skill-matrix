namespace Models
{
    using System.Collections.Generic;

    public class SkillWeightage : BaseModel
    {
        public string Name { get; set; }

        public int Weightage { get; set; }

        public int ActualWeightage { get; set; }

        public List<SkillWeightage> Skills { get; set; } = new List<SkillWeightage>();
    }
}
