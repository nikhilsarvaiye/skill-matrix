namespace Api.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Abstractions;

    [ApiController]
    [Route("[controller]")]
    public class DesignationController : BaseController<Designation>
    {
        private readonly IDesignationService _designationService;

        public DesignationController(IDesignationService designationService)
            : base(designationService)
        {
            this._designationService = designationService ?? throw new ArgumentNullException(nameof(designationService));
        }
    }
}
