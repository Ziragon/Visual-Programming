using DZ10.Model;
using DZ10.Repositories;
using DZ10.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
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

app.Run();