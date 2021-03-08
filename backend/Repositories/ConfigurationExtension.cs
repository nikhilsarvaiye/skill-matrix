namespace Repositories
{
    using Microsoft.Extensions.DependencyInjection;
    using Abstractions;
    
    public static class ConfigurationExtension
    {
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<ISkillRepository, SkillRepository>();
            services.AddScoped<IDesignationRepository, DesignationRepository>();
            services.AddScoped<IDesignationSkillWeightagesRepository, DesignationSkillWeightagesRepository>();
            services.AddScoped<ISkillWeightagesRepository, SkillWeightagesRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}
