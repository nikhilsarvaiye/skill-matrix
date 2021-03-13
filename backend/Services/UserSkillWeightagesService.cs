namespace Services
{
    using Abstractions;
    using DotnetStandardQueryBuilder.Core;
    using FluentValidation;
    using Models;
    using Repositories.Abstractions;
    using Services.Helpers;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Validators;

    public class UserSkillWeightagesService : BaseService<UserSkillWeightages>, IUserSkillWeightagesService
    {
        private readonly ISkillService _skillService;
        private readonly ISkillWeightagesService _skillWeightagesService;
        private readonly IDesignationSkillWeightagesService _designationSkillWeightagesService;
        private readonly IUserService _userService;

        public UserSkillWeightagesService(IUserSkillWeightagesRepository userSkillWeightagesRepository,
            ISkillService skillService,
            IUserService userService,
            ISkillWeightagesService skillWeightagesService,
            IDesignationSkillWeightagesService designationSkillWeightagesService)
            : base(userSkillWeightagesRepository)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _skillWeightagesService = skillWeightagesService ?? throw new ArgumentNullException(nameof(skillWeightagesService));
            _skillService = skillService ?? throw new ArgumentNullException(nameof(skillService));
            _designationSkillWeightagesService = designationSkillWeightagesService ?? throw new ArgumentNullException(nameof(designationSkillWeightagesService));
        }

        public override async Task<IResponse<UserSkillWeightages>> PaginateAsync(IRequest request)
        {
            var designationSkillWeightages = await base.PaginateAsync(request);

            designationSkillWeightages.Items = await UpdateNames(designationSkillWeightages.Items);

            return designationSkillWeightages;
        }

        public override async Task<List<UserSkillWeightages>> GetAsync(IRequest request = null)
        {
            var designationSkillWeightages = await base.GetAsync(request).ConfigureAwait(false);

            designationSkillWeightages = await UpdateNames(designationSkillWeightages);

            return designationSkillWeightages;
        }

        public override async Task<UserSkillWeightages> GetAsync(string id)
        {
            var userSkillWeightage = await base.GetAsync(id).ConfigureAwait(false);

            userSkillWeightage = (await (new List<UserSkillWeightages> { userSkillWeightage }).UpdateSkillNames(_skillService)).FirstOrDefault();

            return userSkillWeightage;
        }

        public async Task<UserSkillWeightages> GetUserDefaultAsync()
        {
            var currentUserId = "6046541a5b7e9816f93a0231";

            var userSkillWeightages = await base.GetAsync(new Request
            {
                Filter = new Filter
                {
                    Operator = FilterOperator.IsEqualTo,
                    Property = nameof(UserSkillWeightages.UserId),
                    Value = currentUserId
                },
                PageSize = 1,
                Select = new List<string> { nameof(UserSkillWeightages.Id) }
            }).ConfigureAwait(false);

            if (userSkillWeightages.Any())
            {
                return userSkillWeightages.FirstOrDefault();
            }

            var currentUser = await _userService.GetOrThrowAsync(currentUserId).ConfigureAwait(false);

            var currentUserSkillWeightages = await _designationSkillWeightagesService.GetAsync(new Request
            {
                Filter = new CompositeFilter
                {
                    LogicalOperator = LogicalOperator.Or,
                    Filters = new List<IFilter>
                        {
                            new Filter
                            {
                                Operator = FilterOperator.IsEqualTo,
                                Property = nameof(DesignationSkillWeightages.UserId),
                                Value = currentUserId
                            },
                            new Filter
                            {
                                Operator = FilterOperator.IsEqualTo,
                                Property = nameof(DesignationSkillWeightages.DesignationId),
                                Value = currentUser.DesignationId
                            }
                        }
                },
                PageSize = 1
            }).ConfigureAwait(false);

            if (!currentUserSkillWeightages.Any())
            {
                throw new Exception("No skill weightage template defined for you.");
            }

            var currentUserSkillWeightage = currentUserSkillWeightages.FirstOrDefault();

            var skillWeightage = await _skillWeightagesService.GetOrThrowAsync(currentUserSkillWeightage.SkillWeightagesId);

            var userSkillWeightage = await CreateAsync(new UserSkillWeightages
            {
                Name = $"${currentUser.FirstName}'s {skillWeightage.Name}",
                SkillWeightagesId = skillWeightage.Id,
                UserId = currentUser.Id,
                Skills = skillWeightage.Skills
            });

            userSkillWeightage = (await (new List<UserSkillWeightages> { userSkillWeightage }).UpdateSkillNames(_skillService)).FirstOrDefault();

            return userSkillWeightage;
        }

        public override async Task ValidateOnCreate(UserSkillWeightages skillWeightages)
        {
            var userSkillWeightagesValidator = new UserSkillWeightagesValidator();

            userSkillWeightagesValidator.ValidateAndThrow(skillWeightages);

            await Task.CompletedTask;
        }

        public override async Task ValidateOnUpdate(UserSkillWeightages skillWeightages)
        {
            await ValidateOnCreate(skillWeightages);
        }

        public override async Task ValidateOnDelete(string id)
        {
            await Task.CompletedTask;
        }
        
        private async Task<List<UserSkillWeightages>> UpdateNames(List<UserSkillWeightages> userSkillWeightages)
        {
            var userIds = userSkillWeightages.Where(x => !string.IsNullOrEmpty(x.UserId)).Select(x => x.UserId).ToList();
            var skillWeightagesIds = userSkillWeightages.Select(x => x.SkillWeightagesId).ToList();

            var users = await _userService.GetAsync(userIds).ConfigureAwait(false);
            var skillWeightages = await _skillWeightagesService.GetAsync(skillWeightagesIds).ConfigureAwait(false);

            foreach (var userSkillWeightage in userSkillWeightages)
            {
                userSkillWeightage.UserName = users.FirstOrDefault(x => userSkillWeightage.UserId == x.Id)?.Name;
                userSkillWeightage.SkillWeightagesName = skillWeightages.FirstOrDefault(x => userSkillWeightage.SkillWeightagesId == x.Id)?.Name;
            }

            return userSkillWeightages;
        }
    }
}
