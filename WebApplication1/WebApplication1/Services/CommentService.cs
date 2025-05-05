using DZ10.Repositories;
using DZ10.Model;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace DZ10.Services
{
    public class CommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<CommentService> _logger;

        public CommentService(ILogger<CommentService> logger, ICommentRepository commentRepository)
        {
            _logger = logger;
            _commentRepository = commentRepository;
        }

        public Comment AddComment(Comment comment)
        {
            try
            {
                _logger.LogInformation("Attempting to add new comment");
                var result = _commentRepository.Add(comment);
                _logger.LogInformation($"Successfully added comment with ID: {result.id}");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding comment");
                throw;
            }
        }

        public Comment? GetCommentById(int id)
        {
            try
            {
                _logger.LogInformation($"Attempting to get comment with ID: {id}");
                var comment = _commentRepository.GetById(id);

                if (comment == null)
                {
                    _logger.LogWarning($"Comment with ID: {id} not found");
                }
                else
                {
                    _logger.LogInformation($"Successfully retrieved comment with ID: {id}");
                }

                return comment;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while getting comment with ID: {id}");
                throw;
            }
        }

        public bool DeleteComment(int id)
        {
            try
            {
                _logger.LogInformation($"Attempting to delete comment with ID: {id}");
                var result = _commentRepository.Delete(id);

                if (result)
                {
                    _logger.LogInformation($"Successfully deleted comment with ID: {id}");
                }
                else
                {
                    _logger.LogWarning($"Comment with ID: {id} not found for deletion");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting comment with ID: {id}");
                throw;
            }
        }

        public Comment? UpdateComment(int id, Comment comment)
        {
            try
            {
                _logger.LogInformation($"Attempting to update comment with ID: {id}");
                var result = _commentRepository.Update(id, comment);

                if (result == null)
                {
                    _logger.LogWarning($"Comment with ID: {id} not found for update");
                }
                else
                {
                    _logger.LogInformation($"Successfully updated comment with ID: {id}");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating comment with ID: {id}");
                throw;
            }
        }

        public IEnumerable<Comment> GetAllComments()
        {
            try
            {
                _logger.LogInformation("Attempting to get all comments");
                var comments = _commentRepository.GetAll();
                _logger.LogInformation($"Successfully retrieved {comments.Count()} comments");
                return comments;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting all comments");
                throw;
            }
        }
    }
}