import React, {useState} from 'react';

const DataSet = ({ headers, data, renderCell, renderHeader, onAddComment, onDeleteSelected, onUpdateItem}) => {
    const [isCtrlDown, setIsCtrlDown] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    const onClickHandler = (id) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(itemId => itemId !== id);
            } else {
                if (!isCtrlDown) {
                    return [id];
                } else {
                    return [...prev, id];
                }
            }
        });
    }

    const indexOfLastItem = currentPage * 20;
    const indexOfFirstItem = indexOfLastItem - 20;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const headerReplace = () => {
        if (headers && headers.length > 0) {
            return headers;
        }

        if (!data || data.length === 0 || typeof data[0] !== 'object') {
            return [];
        }

        return Object.keys(data[0])
        .filter(key => key !== "id")
        .map(key => ({
            key: key,
            title: key,
        }))
    }

    const handleAddComment = () => {
        const comment = {};
        headerReplace().forEach((header) => {
            comment[header.title] = prompt(`Enter ${header.title}`);
        });
        if (comment) {
            onAddComment(comment);
        }
    }

    const handleDeleteSelected = () => {
        if (selectedIds.length > 0) {
            onDeleteSelected(selectedIds);
            setSelectedIds([]);
        }
    };

    const handleUpdateSelected = () => { 
        const itemToUpdate = data.find(item => item.id === selectedIds[0]);
        if (!itemToUpdate) return;
    
        const updatedData = {};
        headerReplace().forEach((header) => {
            const newValue = prompt(`Enter new ${header.title}`, itemToUpdate[header.key]);
            if (newValue !== null) {
                updatedData[header.key] = newValue;
            }
        });
    
        if (Object.keys(updatedData).length > 0) {
            onUpdateItem(selectedIds[0], updatedData);
            setSelectedIds([]);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSelectedIds([]);
    };

    const renderPagination = () => {
        const pageButtons = [];
        for (let i = 1; i <= Math.ceil(data.length/20); i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={currentPage === i}
                >
                    {i}
                </button>
            );
        }
        return pageButtons;
    };

    return (
        <div
            onKeyUp={e => {
                setIsCtrlDown(e.ctrlKey);
            }}
            onKeyDown={e => {
                if(!isCtrlDown && e.ctrlKey) {
                    setIsCtrlDown(e.ctrlKey)
                }}} tabIndex={0}>
            <div className="table-controls">
                <button onClick={handleAddComment}>
                    Add Comment
                </button>
                <button onClick={handleDeleteSelected} disabled={selectedIds.length === 0}>
                    Delete Selected
                </button>
                <button onClick={handleUpdateSelected} disabled={selectedIds.length === 0 || selectedIds.length > 1}>
                    Update Comment
                </button>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        {headerReplace().map((header, index) => (
                            <th className='td' key={index}>{renderHeader ? renderHeader(header) : header.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item.id} className={selectedIds.includes(item.id) ? 'row-selected' : ''}>
                            <td
                                className='select-left'
                                onClick={() => onClickHandler(item.id)}
                            >
                                {indexOfFirstItem + index + 1}
                            </td>
                            {headerReplace().map((header) => (
                                <td className='td' key={header.key}>{renderCell ? renderCell(item[header.key]) : item[header.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {renderPagination()}
            </div>
        </div>
    );
};

export default DataSet;