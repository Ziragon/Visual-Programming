import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

const App = () => {
    const [allLogs, setAllLogs] = useState([]);
    const [displayedLogs, setDisplayedLogs] = useState([]);
    const [levelFilter, setLevelFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

    useEffect(() => {
        axios.get("http://localhost:5158/logs")
            .then(res => {
                setAllLogs(res.data);
                setDisplayedLogs(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        let result = [...allLogs];

        if (levelFilter) {
            result = result.filter(log => log.level === levelFilter);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(log => 
                log.message.toLowerCase().includes(query) ||
                (log.exception && log.exception.toLowerCase().includes(query))
            );
        }

        result.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setDisplayedLogs(result);
    }, [allLogs, levelFilter, searchQuery, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="logs-container">
            <h1>Логи приложения</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Поиск по сообщению"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                >
                    <option value="">Все уровни</option>
                    <option value="Information">Info</option>
                    <option value="Warning">Warning</option>
                    <option value="Error">Error</option>
                </select>
            </div>
            <table className="logs-table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>
                            ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => requestSort('timestamp')}>
                            Время {sortConfig.key === 'timestamp' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => requestSort('level')}>
                            Уровень {sortConfig.key === 'level' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>Сообщение</th>
                        <th onClick={() => requestSort('source')}>
                            Источник {sortConfig.key === 'source' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayedLogs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td>{log.level}</td>
                            <td>{log.message}</td>
                            <td>{log.source}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;