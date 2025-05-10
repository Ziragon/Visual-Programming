using WebApplication1.Repositories;

namespace WebApplication1.Logging
{
    public class DatabaseLoggerProvider : ILoggerProvider
    {
        private readonly CommentContext _context;

        public DatabaseLoggerProvider(CommentContext context)
        {
            _context = context;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new DatabaseLogger(_context, categoryName);
        }

        public void Dispose() { }
    }
}
