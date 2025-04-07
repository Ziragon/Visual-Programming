import React, {useState, useEffect, useOptimistic, startTransition} from 'react';
import DataSet from './components/DataSet';
import './App.css'

const App = () => {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => {
      if (newComment.action === 'add') {
        return [{ ...newComment.data, id: comments.length + 1 }, ...state];
      }
      if (newComment.action === 'delete') {
        return state.filter(comment => !newComment.ids.includes(comment.id));
      }
      if (newComment.action === 'update') {
        return state.map(comment => 
          comment.id === newComment.id ? { ...comment, ...newComment.data } : comment
        );
      }
      return state;
    }
  );

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const data = await response.json();
        setComments(data);
    };

    fetchData();
  }, []);

  const addComment = async (newComment) => {
    try {
      startTransition(() => {
        addOptimisticComment({ action: 'add', data: newComment });
      });
      
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if (!response.ok) throw new Error('Failed to add comment');
      
      const data = await response.json();
      setComments(prev => [data, ...prev]);
    } catch (err) {
      setComments(comments);
      alert('Failed to add comment: ' + err.message);
    }
  };

  const deleteComments = async (ids) => {
    try {
      startTransition(() => {
        addOptimisticComment({ action: 'delete', ids });
      });

      const deletePromises = ids.map(id => 
        fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
          method: 'DELETE',
        })
      );
      
      const results = await Promise.all(deletePromises);
      if (results.some(r => !r.ok)) throw new Error('Some deletions failed');
      
      setComments(prev => prev.filter(c => !ids.includes(c.id)));
    } catch (err) {
      setComments(comments);
      alert('Failed to delete comments: ' + err.message);
    }
  };

  const updateComment = async (id, updatedData) => {
    try {
      startTransition(() => {
        addOptimisticComment({ action: 'update', id, data: updatedData });
      });

      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if (!response.ok) throw new Error('Failed to update comment');
      
      setComments(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    } catch (err) {
      setComments(comments);
      alert('Failed to update comment: ' + err.message);
    }
  };

  return (
    <div>
      <DataSet
        data={optimisticComments}
        renderCell={(item) => item}
        renderHeader={(header) => header.title}
        onAddComment={addComment}
        onDeleteSelected={deleteComments}
        onUpdateItem={updateComment}
        />
    </div>
  );
};

export default App;