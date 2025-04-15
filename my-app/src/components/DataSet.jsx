import React from 'react';

const DataSet = ({data}) => {

    const flattenData = (item, parentKey = '') => {
        const flattened = {};
    
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const fullKey = parentKey ? `${parentKey} ${key}` : key;
                if (typeof item[key] === 'object' && item[key] !== null) {
                    Object.assign(flattened, flattenData(item[key], fullKey));
                } else {
                    flattened[fullKey] = item[key];
                }
            }
        }
    
        return flattened;
    };

    const formatCellValue = (value) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        return value;
    };

    const headerReplace = () => {
        if (!data || data.length === 0 || typeof data[0] !== 'object') {
            return [];
        }

        const firstItem = flattenData(data[0]);
        return Object.keys(firstItem)
            .filter((key) => key !== 'id')
            .map((key) => ({
                key: key,
                title: key,
            }));
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {headerReplace().map((header, index) => (
                            <th className="td" key={index}>
                                {header.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const flattenedItem = flattenData(item);
                        return (
                            <tr key={item.id}>
                                <td className="select-left">
                                    {index + 1}
                                </td>
                                {headerReplace().map((header) => (
                                    <td className="td" key={header.key}>
                                        {formatCellValue(flattenedItem[header.key])}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DataSet;