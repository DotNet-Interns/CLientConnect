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

            builder.Services.AddCors(options =>
            {
               

                options.AddPolicy("AnotherPolicy",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                    });
                //options.AddDefaultPolicy(
                //                  policy =>
                //                  {
                //                      policy.WithOrigins("http://localhost:5173/").AllowAnyHeader().AllowAnyMethod();
                //                  });
            });


            builder.WebHost.ConfigureKestrel(serverop =>
            {
                serverop.ListenAnyIP(5100);
            });
            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddSingleton<JwtTokenService>(); // Use Scoped for JWT service
            builder.Services.AddDbContext<ClientConnectContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



            // No need to register middleware as a service
             //builder.Services.AddScoped<Authenticate>(); // Comment or remove this line

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(); 
            

            var app = builder.Build();

            app.UseCors();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            //app.UseMiddleware<Authenticate>(); 
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
