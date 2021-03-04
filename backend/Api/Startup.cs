namespace Api
{
    using Common.Middleware;
    using Configuration.Options;
    using Configuration.Options.Abstractions;
    using Microsoft.AspNet.OData.Builder;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authentication.OpenIdConnect;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Microsoft.Identity.Web;
    using Microsoft.OData.Edm;
    using Microsoft.OpenApi.Models;
    using Models;
    using Serilog;
    using Services;
    using System.Collections.Generic;
    using IApplicationLifetime = Microsoft.Extensions.Hosting.IApplicationLifetime;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            SetupLogging(Configuration);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // ------ Authentication --------

            // -- Direct web api authentication --
            // services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApp(Configuration.GetSection("AzureAd"));
            // services.AddControllersWithViews(options =>
            // {
            // var policy = new AuthorizationPolicyBuilder()
            //         .RequireAuthenticatedUser()
            //         .Build();
            // options.Filters.Add(new AuthorizeFilter(policy));
            // });
            // -- End direct web api authentication --

            // -- JWT web api authentication --
            // Use below for JWT web api authentication from authentication header
            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"));
            services.AddMicrosoftIdentityWebApiAuthentication(Configuration, "AzureAd", "Bearer", true);
            /* Customization */
            //services.Configure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options => 
            //{
            //    var existingOnTokenValidatedHandler = options.Events.OnTokenValidated;
            //    options.Events.OnMessageReceived = async context =>
            //    {

            //    };
            //    options.Events.OnTokenValidated = async context =>
            //    {
            //        await existingOnTokenValidatedHandler(context);
            //        // Your code to add extra configuration that will be executed after the current event implementation.
            //        // options.TokenValidationParameters.ValidIssuers = new List<string>() { /* list of valid issuers */ };
            //        // options.TokenValidationParameters.ValidAudiences = new List<string>() { /* list of valid audiences */ };
            //    };
            //    options.Events.OnAuthenticationFailed = async context =>
            //    {

            //    };
            //});
            /* End Customization */
            // -- End JWT web api authentication --

            // ------ End Authentication --------

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
            });

            // Configurations
            services.Configure<AppOptions>(Configuration.GetSection(nameof(AppOptions)));
            services.Configure<MongoDbOptions>(Configuration.GetSection(nameof(MongoDbOptions)));
            services.AddSingleton<IDbOptions>(options => options.GetRequiredService<IOptions<MongoDbOptions>>().Value);

            // Services/Repositories Configurations
            services.ConfigureServices();

            // OData
            // services.AddOData();
            // services.AddMvc(options => options.EnableEndpointRouting = false);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, IApplicationLifetime appLifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
            }

            loggerFactory.AddSerilog();
            appLifetime.ApplicationStopped.Register(Log.CloseAndFlush);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            /* Enable
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                      builder =>
                      {
                          builder.
                               AllowAnyHeader().
                               AllowAnyMethod().
                               AllowCredentials().

                          WithOrigins(Configuration.GetSection("CORS:ConnectionString").Get<string>());

                          builder.Build();
                      });
            });
            */

            // Logging
            app.UseMiddleware<RequestLoggingMiddleware>();

            // Authentication
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // odata
                // endpoints.Select().Filter().OrderBy().Count().MaxTop(10);
                // endpoints.EnableDependencyInjection();//This guy solves the problem    
                // endpoints.MapODataRoute("odata", "odata", GetEdmModel());
            });
        }

        private IEdmModel GetEdmModel()
        {
            var odataBuilder = new ODataConventionModelBuilder();
            odataBuilder.EntitySet<Skill>("Skills");

            return odataBuilder.GetEdmModel();
        }

        private static void SetupLogging(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration()
                        .Enrich.FromLogContext()
                        .ReadFrom.Configuration(configuration)
                        .CreateLogger();
        }
    }
}
