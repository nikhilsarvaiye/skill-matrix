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

            return services;
        }
    }
}
