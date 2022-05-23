using Microsoft.EntityFrameworkCore;
using PslibWebApp.Controllers;
using PslibWebApp.Data;
using PslibWebApp.Definitions;
using PslibWebApp.Services;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// logging to files
var sLog = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("Logs\\log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(sLog);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});
builder.Services.AddOptions();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(AuthorizationConstants.ADMIN_POLICY, policy =>
    {
        policy.RequireClaim(AuthorizationConstants.ADMIN_CLAIM, "1");
    });
});
builder.Services.AddAuthentication("Bearer").AddJwtBearer("Bearer", options => {
    options.Authority = builder.Configuration["Authority:Server"];
    options.RequireHttpsMetadata = true;
    options.Audience = builder.Configuration["Authority:Audience"];
});
builder.Services.Configure<ClientConfigurationOptions>(
    builder.Configuration.GetSection("OidcClient")
);
builder.Services.Configure<UsersConfigurationOptions>(
    builder.Configuration.GetSection("Users")
);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllersWithViews().AddNewtonsoftJson();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
