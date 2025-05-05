using DZ10.Model;
using DZ10.Repositories;
using DZ10.Services;
using WebApplication1.Repositories;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Logging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CommentContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService>();

builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddLogging(logging =>
{
    logging.ClearProviders();
    logging.AddProvider(new DatabaseLoggerProvider(builder.Services.BuildServiceProvider().GetRequiredService<CommentContext>()));
    logging.AddConsole();
});

var app = builder.Build();
app.UseCors();

app.MapGet("/comments", (CommentService commentService) => commentService.GetAllComments());
app.MapGet("/comments/{id}", (int id, CommentService commentService) => commentService.GetCommentById(id));
app.MapPost("/comments", (Comment comment, CommentService commentService) =>
{
    commentService.AddComment(comment);
    return Results.Ok(comment);
});
app.MapPatch("/comments/{id}", (int id, Comment comment, CommentService commentService) => commentService.UpdateComment(id, comment));
app.MapDelete("/comments/{id}", (int id, CommentService commentService) => commentService.DeleteComment(id));

app.MapGet("/logs", (CommentContext context) =>
{
    return context.Logs
        .AsNoTracking()
        .OrderByDescending(log => log.Timestamp)
        .ToList();
});

app.Run();