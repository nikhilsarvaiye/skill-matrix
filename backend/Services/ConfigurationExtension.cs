namespace Services
{
    using Abstractions;
    using Microsoft.Extensions.DependencyInjection;
    using Repositories;

    public static class ConfigurationExtension
    {
        public static IServiceCollection ConfigureServices(this IServiceCollection services)
        {
            services.ConfigureRepositories();

            services.AddScoped<ISkillService, SkillService>();
            services.AddScoped<IDesignationService, DesignationService>();
            services.AddScoped<IDesignationSkillWeightagesService, DesignationSkillWeightagesService>();
            services.AddScoped<ISkillWeightagesService, SkillWeightagesService>();
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
