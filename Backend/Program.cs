using Backend.Middlewares;
using Backend.Models;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //Added dependency to get http context in controllers to get the jwt payload
            builder.Services.AddHttpContextAccessor();
            builder.WebHost.ConfigureKestrel(serverop =>
            {
                serverop.ListenAnyIP(5100);
            });
            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddSingleton<JwtTokenService>(); // Use Scoped for JWT service
            builder.Services.AddDbContext<ClientConnectContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowSpecificOrigins",
            //        policy =>
            //        {
            //            policy.WithOrigins("http://172.20.68.21:5173")  // Replace with your frontend URL
            //                  .AllowAnyHeader()
            //                  .AllowAnyMethod()
            //                  .AllowCredentials();  // Enable credentials (cookies, authorization headers)
            //        });
            //});
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    policy =>
                    {
                        policy.AllowAnyOrigin()  // Replace with your frontend URL
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              ;  // Enable credentials (cookies, authorization headers)
                    });
            });


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(); 
            

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowSpecificOrigins");
            app.UseMiddleware<Authenticate>(); 
            //app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
