using DZ10.Model;

namespace DZ10.Repositories
{
    public interface ICommentRepositoryOld
    {
        IEnumerable<Comment> GetAll();
        Comment GetById(int id);
        void Add(Comment comment);
        void Update(int id, Comment comment);
        void Delete(int id);
    }
}
