import React, {useState} from 'react';

const DataSet = ({ headers, children, renderChildren, renderHeader}) => {
    const [isVisible, setIsVisible] = useState(false);

    const changeVisibility = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div className='App'>
            <ul className='header'>
                <li className='li' onClick={() => changeVisibility()}>{renderHeader(headers)}</li>
           
                <span className={isVisible ? 'ul-visible' : 'ul-invisible'}>
                    <ul className='header'>
                        {children.map((item, index) => (
                            <li className='li1'>{index+1} {renderChildren(item)}</li>
                        ))}
                    </ul>
                </span>
            </ul>
        </div>
    );
};

export default DataSet