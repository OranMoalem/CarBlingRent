using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CarBlingRent
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(setup => setup.AddPolicy("EntireWorld", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

            services.AddCors(setup => setup.AddPolicy("LocalhostDevelopment", policy => policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader()));

            services.AddControllers();

            services.AddSingleton<BranchesLogic>();

            services.AddSingleton<ManufacturersLogic>();

            services.AddSingleton<UsersLogic>();


            JwtHelper jwtHelper = new JwtHelper(Configuration.GetValue<string>("JWT:Key"));

            services.AddSingleton(jwtHelper);

            // Enable JWT Authentication: 
            services.AddAuthentication(options => jwtHelper.SetAuthenticationOptions(options)).AddJwtBearer(options => jwtHelper.SetBearerOptions(options));
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("EntireWorld");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
