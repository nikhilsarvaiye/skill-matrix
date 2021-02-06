namespace Services
{
    using Abstractions;
    using Microsoft.Extensions.DependencyInjection;

    public static class Configuration
    {
        public static IServiceCollection ConfigureRepositories(IServiceCollection services)
        {
            services.AddScoped<ISkillService, SkillService>();

            return services;
        }
    }
}
