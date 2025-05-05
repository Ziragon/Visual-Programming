using DZ10.Model;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Repositories;
using System.Diagnostics;

namespace DZ10.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly CommentContext _context;

        public CommentRepository(CommentContext context)
        {
            _context = context;
        }

        public Comment Add(Comment comment)
        {
            comment.id = 0;
            _context.Comments.Add(comment);
            _context.SaveChanges();
            return comment;
        }

        public bool Delete(int id)
        {
            var comment = _context.Comments.FirstOrDefault(c => c.id == id);
            if (comment == null) return false;

            _context.Comments.Remove(comment);
            return _context.SaveChanges() > 0;
        }

        public Comment? GetById(int id)
        {
            return _context.Comments
                .AsNoTracking()
                .FirstOrDefault(c => c.id == id);
        }

        public Comment? Update(int id, Comment comment)
        {
            var existingComment = _context.Comments.FirstOrDefault(c => c.id == id);
            if (existingComment == null) return null;

            existingComment.name = comment.name;
            existingComment.email = comment.email;
            existingComment.body = comment.body;
            existingComment.postId = comment.postId;

            _context.SaveChanges();
            return existingComment;
        }

        public IEnumerable<Comment> GetAll()
        {
            return _context.Comments
                .AsNoTracking()
                .OrderBy(c => c.id)
                .ToList();
        }
    }
}