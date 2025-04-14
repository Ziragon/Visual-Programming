import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import TablePage from './components/TablePage'
import './App.css';

const App = () => {
  const [data, setData] = useState({
    comments: [],
    posts: [],
    albums: [],
    todos: [],
    users: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const urls = {
          comments: 'https://jsonplaceholder.typicode.com/comments',
          posts: 'https://jsonplaceholder.typicode.com/posts',
          albums: 'https://jsonplaceholder.typicode.com/albums',
          todos: 'https://jsonplaceholder.typicode.com/todos',
          users: 'https://jsonplaceholder.typicode.com/users',
        };

        const responses = await Promise.all([
          fetch(urls.comments),
          fetch(urls.posts),
          fetch(urls.albums),
          fetch(urls.todos),
          fetch(urls.users),
        ]);

        const [comments, posts, albums, todos, users] = await Promise.all(
          responses.map(res => res.json())
        );

        setData({
          comments,
          posts,
          albums,
          todos,
          users,
          loading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchAllData();
  }, []);

  if (data.loading) return <div className="loading">Loading all data...</div>;
  if (data.error) return <div className="error">Error: {data.error}</div>;

  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li><Link to="/comments">Comments</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/albums">Albums</Link></li>
            <li><Link to="/todos">Todos</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<div>Select a table from the sidebar</div>} />
            <Route path="/comments" element={<TableWrapper data={data.comments} type="comments" />} />
            <Route path="/posts" element={<TableWrapper data={data.posts} type="posts" />} />
            <Route path="/albums" element={<TableWrapper data={data.albums} type="albums" />} />
            <Route path="/todos" element={<TableWrapper data={data.todos} type="todos" />} />
            <Route path="/users" element={<TableWrapper data={data.users} type="users" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const TableWrapper = ({ data, type }) => {
  const location = useLocation();
  return <TablePage key={location.pathname} data={data} type={type} />;
};

export default App;