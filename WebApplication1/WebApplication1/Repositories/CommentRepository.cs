using DZ10.Model;
using System.Text.Json;

namespace DZ10.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private Dictionary<int, Comment> _comments = new Dictionary<int, Comment>();
        private int _lastId = 0;

        public CommentRepository()
        {
            LoadDataFromJson();
        }

        private void LoadDataFromJson()
        {
            string filePath = "data.json";

            if (File.Exists(filePath))
            {
                string jsonData = File.ReadAllText(filePath);
                var commentsList = JsonSerializer.Deserialize<List<Comment>>(jsonData);

                if (commentsList != null && commentsList.Any())
                {
                    foreach (var comment in commentsList)
                    {
                        _comments.Add(comment.id, comment);
                    }

                    // Устанавливаем _lastId как максимальный Id из загруженных комментариев
                    _lastId = _comments.Keys.Max();
                }
            }
        }

        public void Add(Comment comment)
        {
            ++_lastId;
            comment.id= _lastId;
            _comments.Add(comment.id, comment);
        }

        public void Delete(int id)
        {
            if (_comments.ContainsKey(id))
            {
                _comments.Remove(id);
            }
        }

        public Comment GetById(int id)
        {
            return _comments[id];
        }

        public void Update(int id, Comment comment)
        {
            _comments[id] = comment;
            _comments[id].id = id;
        }

        public IEnumerable<Comment> GetAll()
        {
            return _comments.Values;
        }
    }
}
