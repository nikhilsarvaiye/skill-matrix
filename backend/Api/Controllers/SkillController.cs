namespace Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNet.OData.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.OData.Edm;
    using Microsoft.OData.UriParser;
    using Models;
    using Services.Abstractions;

    [ApiController]
    [Route("[controller]")]
    public class SkillController : ControllerBase
    {
        private readonly ISkillService _skillService;

        public SkillController(ISkillService skillService)
        {
            this._skillService = skillService ?? throw new ArgumentNullException(nameof(skillService));
        }

        [HttpGet]
        public async Task<IEnumerable<Skill>> GetAsync()
        {
            var parser = new ODataUriParser(this.GetEdmModel(), this.GetServiceRoot(this.Request), this.GetRelativeUri(this.Request));
            var filterClause = parser.ParseFilter();
            var selectExpandClause = parser.ParseSelectAndExpand();
            // var b = new ODataQueryOptionParser(this.GetEdmModel(), parser.ParsePath(), parser.CustomQueryOptions);

            // Parsing a filter, e.g. /Products?$filter=Name eq 'beer' 
            if (filterClause != null)
            {
                var binaryOperator = filterClause.Expression as BinaryOperatorNode;
                if (binaryOperator != null)
                {
                    var property = binaryOperator.Left as SingleValuePropertyAccessNode ?? binaryOperator.Right as SingleValuePropertyAccessNode;
                    var constant = binaryOperator.Left as ConstantNode ?? binaryOperator.Right as ConstantNode;

                    if (property != null && property.Property != null && constant != null && constant.Value != null)
                    {
                        Console.WriteLine("Property: " + property.Property.Name);
                        Console.WriteLine("Operator: " + binaryOperator.OperatorKind);
                        Console.WriteLine("Value: " + constant.LiteralText);
                    }
                }

                var inOperator = filterClause.Expression as InNode;
                if (inOperator != null)
                {
                    var property = inOperator.Left as SingleValueNode;
                    var constant = inOperator.Right as CollectionNode;

                    Console.WriteLine("Property: " + inOperator.Left.ToString());
                    Console.WriteLine("Operator: " + inOperator.Kind);
                    Console.WriteLine("Value: " + inOperator.Right.ToString());
                }
            }

            // Parsing a select list , e.g. /Products?$select=Price,Name
            if (selectExpandClause != null)
            {
                foreach (var item in selectExpandClause.SelectedItems)
                {
                    var selectItem = item as PathSelectItem;
                    if (selectItem != null && selectItem.SelectedPath != null)
                    {
                        var segment = selectItem.SelectedPath.FirstSegment as PropertySegment;
                        if (segment != null)
                        {
                            Console.WriteLine("Property: " + segment.Property.Name);
                        }
                    }
                }
            }
            
            var result = await this._skillService.GetAsync();

            return result;
        }

        [HttpPost]
        public async Task<Skill> CreateAsync(Skill skill)
        {
            return await this._skillService.CreateAsync(skill);
        }

        private Uri GetServiceRoot(HttpRequest httpRequest)
        {
            return new Uri("https://services.odata.org/V4/OData/OData.svc");
        }

        private Uri GetRelativeUri(HttpRequest httpRequest)
        {
            return new Uri(string.Format("https://services.odata.org/V4/OData/OData.svc/Skills?$select=Name,Id&$filter=Name in ('Milk', 'Cheese', 'Donut')", httpRequest.QueryString));
        }

        private IEdmModel GetEdmModel()
        {
            var odataBuilder = new ODataConventionModelBuilder();
            odataBuilder.EntitySet<Skill>("Skills");

            return odataBuilder.GetEdmModel();
        }
    }
}
