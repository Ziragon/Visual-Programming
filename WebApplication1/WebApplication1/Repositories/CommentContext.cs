using DZ10.Model;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Repositories
{
    public class CommentContext : DbContext
    {
        public CommentContext(DbContextOptions<CommentContext> options) : base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Log> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comments");
                entity.Property(e => e.id).HasColumnName("id");
                entity.Property(e => e.name).HasColumnName("name");
                entity.Property(e => e.email).HasColumnName("email");
                entity.Property(e => e.body).HasColumnName("body");
                entity.Property(e => e.postId).HasColumnName("post_id");
            });
            modelBuilder.Entity<Log>(entity =>
            {
                entity.ToTable("logs");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Timestamp).HasColumnName("timestamp");
                entity.Property(e => e.Level).HasColumnName("level");
                entity.Property(e => e.Message).HasColumnName("message");
                entity.Property(e => e.Exception).HasColumnName("exception");
                entity.Property(e => e.Source).HasColumnName("source");
            });
        }
    }
}
