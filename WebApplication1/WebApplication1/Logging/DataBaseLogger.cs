using WebApplication1.Model;
using WebApplication1.Repositories;

namespace WebApplication1.Logging
{
    public class DatabaseLogger : ILogger
    {
        private readonly CommentContext _context;
        private readonly string _categoryName;

        public DatabaseLogger(CommentContext context, string categoryName)
        {
            _context = context;
            _categoryName = categoryName;
        }

        public IDisposable BeginScope<TState>(TState state) => null;

        public bool IsEnabled(LogLevel logLevel) => true;

        public void Log<TState>(
            LogLevel logLevel,
            EventId eventId,
            TState state,
            Exception exception,
            Func<TState, Exception, string> formatter)
        {
            if (formatter == null) return;

            var message = formatter(state, exception);
            _context.Logs.Add(new Log
            {
                Level = logLevel.ToString(),
                Message = message,
                Exception = exception?.ToString(),
                Source = _categoryName
            });
            _context.SaveChanges();
        }
    }
}
