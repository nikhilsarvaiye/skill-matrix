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

            return services;
        }
    }
}
