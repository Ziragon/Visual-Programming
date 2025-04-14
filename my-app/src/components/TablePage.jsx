import React, { useState, useEffect, useOptimistic, startTransition } from 'react';
import DataSet from './DataSet';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Схемы валидации для разных типов данных
const validationSchemas = {
  comments: Yup.object().shape({
    postId: Yup.number().required('User ID is required').positive().integer(),
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    body: Yup.string().required('Body is required'),
  }),
  posts: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
    userId: Yup.number().required('User ID is required').positive().integer(),
  }),
  albums: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    userId: Yup.number().required('User ID is required').positive().integer(),
  }),
  todos: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    completed: Yup.boolean().required('Completed status is required'),
    userId: Yup.number().required('User ID is required').positive().integer(),
  }),
  users: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    website: Yup.string().required('Website is required'),
  }),
};

const initialValues = {
  comments: {
    postId: 1,
    name: '',
    email: '',
    body: '',
  },
  posts: {
    userId: 1,
    title: '',
    body: '',
  },
  albums: {
    userId: 1,
    title: '',
  },
  todos: {
    userId: 1,
    title: '',
    completed: false,
  },
  users: {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  },
};

const AddForm = ({ type, onSubmit }) => {
  const schema = validationSchemas[type];
  const initial = initialValues[type];

  return (
    <Formik
      initialValues={initial}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="add-form">
          <h3>Add new {type.slice(0, -1)}</h3>
          
          {type === 'comments' && (
            <>
              <div className="form-group">
                <label>Post ID</label>
                <Field name="postId" type="number" />
                <ErrorMessage name="postId" component="div" className="error" />
              </div>
              
              <div className="form-group">
                <label>Name</label>
                <Field name="name" type="text" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <Field name="email" type="text" />
                <ErrorMessage name="body" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Body</label>
                <Field name="body" type="text" />
                <ErrorMessage name="body" component="div" className="error" />
              </div>
            </>
          )}
          
          {type === 'posts' && (
            <>
              <div className="form-group">
                <label>User ID</label>
                <Field name="userId" type="number" />
                <ErrorMessage name="userId" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Title</label>
                <Field name="title" type="text" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              
              <div className="form-group">
                <label>Body</label>
                <Field name="body" as="textarea" />
                <ErrorMessage name="body" component="div" className="error" />
              </div>
            </>
          )}

          {type === 'albums' && (
            <>
              <div className="form-group">
                <label>User ID</label>
                <Field name="userId" type="number" />
                <ErrorMessage name="userId" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Title</label>
                <Field name="title" type="text" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
            </>
          )}

          {type === 'todos' && (
            <>
              <div className="form-group">
                <label>User ID</label>
                <Field name="userId" type="number" />
                <ErrorMessage name="userId" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Title</label>
                <Field name="title" type="text" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              
              <div className="form-group">
                <label>Completed</label>
                <Field name="completed" type="checkbox" />
                <ErrorMessage name="completed" component="div" className="error" />
              </div>
            </>
          )}

          {type === 'users' && (
            <>
              <div className="form-group">
                <label>Name</label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              
              <div className="form-group">
                <label>Username</label>
                <Field name="username" type="text" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <Field name="email" type="text" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <Field name="phone" type="text" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
              
              <div className="form-group">
                <label>Website</label>
                <Field name="website" type="text" />
                <ErrorMessage name="website" component="div" className="error" />
              </div>
            </>
          )}

          <button type="submit" disabled={isSubmitting}>
            Add {type.slice(0, -1)}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const TablePage = ({ data, type }) => {
  const urls = {
    comments: 'https://jsonplaceholder.typicode.com/comments',
    posts: 'https://jsonplaceholder.typicode.com/posts',
    albums: 'https://jsonplaceholder.typicode.com/albums',
    todos: 'https://jsonplaceholder.typicode.com/todos',
    users: 'https://jsonplaceholder.typicode.com/users',
  };

  const url = urls[type];
  const [comments, setComments] = useState(data);

  useEffect(() => {
    setComments(data);
  }, [data]);

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

  const addComment = async (newComment) => {
    try {
      startTransition(() => {
        addOptimisticComment({ action: 'add', data: newComment });
      });
      
      const response = await fetch(url, {
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
        fetch(`${url}/${id}`, {
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

      const response = await fetch(`${url}/${id}`, {
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
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      
      <AddForm type={type} onSubmit={addComment} />
      
      <DataSet
        data={optimisticComments}
        renderCell={(item) => {
            if (typeof item === 'boolean') {
                return item ? 'Yes' : 'No';
            }
            return item;
        }}
        renderHeader={(header) => header.title}
        onDeleteSelected={deleteComments}
        onUpdateItem={updateComment}
        url={url}
      />
    </div>
  );
};

export default TablePage;