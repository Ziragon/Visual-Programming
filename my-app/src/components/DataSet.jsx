import React, {useState} from 'react';

const DataSet = ({ headers, data, renderCell, renderHeader}) => {
    const [isCtrlDown, setIsCtrlDown] = useState(false);
    const [state, setState] = useState(data.map((item, index) => {
        return {
            id: index,
            isSelected: false
        }
    }));
    
    const onClickHandler = (id) => {
        setState(state.map((item, index) => {
            if(item.id === id) {
                item.isSelected = !item.isSelected;
            }
            else if(!isCtrlDown) {
                item.isSelected = false;
            }
            return item;
        }))
    }

    const headerReplace = () => {
        if (headers && headers.length > 0) {
            return headers;
        }

        if (!data || data.length === 0 || typeof data[0] !== 'object') {
            return [];
        }

        return Object.keys(data[0]).slice(1).map(key => ({
            key: key,
            title: key,
        }))
    }

    return (
        <div
            onKeyUp={e => {
                setIsCtrlDown(e.ctrlKey);
            }}
            onKeyDown={e => {
                if(!isCtrlDown && e.ctrlKey) {
                    setIsCtrlDown(e.ctrlKey)
                }}} tabIndex={0}>
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
                    {data.map((item, index) => (
                        <tr key={index} className={state[index].isSelected ? 'row-selected' : ''}>
                            <td
                                className='select-left'
                                onClick={() => onClickHandler(index)}
                            >
                                {index}
                            </td>
                            {headerReplace().map((header) => (
                                <td className='td' key={header.key}>{renderCell ? renderCell(item[header.key]) : item[header.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataSet