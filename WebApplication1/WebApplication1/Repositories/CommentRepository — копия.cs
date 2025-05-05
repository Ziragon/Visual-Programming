using DZ10.Model;
using Npgsql;

namespace DZ10.Repositories
{
    public class CommentRepositoryOld : ICommentRepositoryOld
    {
        private readonly string _connectionString;

        public CommentRepositoryOld(string connectionString = "Host=localhost;Database=postgres;Username=postgres;Password=358711565")
        {
            _connectionString = connectionString;
        }

        public void Add(Comment comment)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var cmd = new NpgsqlCommand(
                    "INSERT INTO comments (post_id, name, email, body) VALUES (@postId, @name, @email, @body) RETURNING id",
                    connection))
                {
                    cmd.Parameters.AddWithValue("@postId", comment.postId);
                    cmd.Parameters.AddWithValue("@name", comment.name);
                    cmd.Parameters.AddWithValue("@email", comment.email);
                    cmd.Parameters.AddWithValue("@body", comment.body);
                    comment.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var cmd = new NpgsqlCommand("DELETE FROM comments WHERE id = @id", connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Comment GetById(int id)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM comments WHERE id = @id", connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return MapCommentFromReader(reader);
                        }
                        return null;
                    }
                }
            }
        }

        public void Update(int id, Comment comment)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var cmd = new NpgsqlCommand(
                    "UPDATE comments SET post_id = @postId, name = @name, email = @email, body = @body WHERE id = @id",
                    connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@postId", comment.postId);
                    cmd.Parameters.AddWithValue("@name", comment.name);
                    cmd.Parameters.AddWithValue("@email", comment.email);
                    cmd.Parameters.AddWithValue("@body", comment.body);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public IEnumerable<Comment> GetAll()
        {
            var comments = new List<Comment>();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                using (var cmd = new NpgsqlCommand("SELECT * FROM comments", connection))
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        comments.Add(MapCommentFromReader(reader));
                    }
                }
            }

            return comments;
        }

        private Comment MapCommentFromReader(NpgsqlDataReader reader)
        {
            return new Comment
            {
                id = reader.GetInt32(0),
                postId = reader.GetInt32(1),
                name = reader.GetString(2),
                email = reader.GetString(3),
                body = reader.GetString(4)
            };
        }
    }
}