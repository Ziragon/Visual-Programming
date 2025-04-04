import React from 'react'

function ObjOut({...props}) {
    if(!props.objs || props.objs === 0) {
        return <p>Обьекты не найдены</p>
    }
    return (
        <div className='obj_pattern'>
            {props.objs.map((obj,id) => (
                <div key={id} className='pattern'>
                    <p className='text_authors'>UserID: {obj.userId}</p>
                    <p className='text_authors'>ID: {obj.id}</p>
                    <p className='text_header'>{obj.title}</p>
                    <p className='text_authors'>{obj.body}</p>
                </div>
            ))}
        </div>
    );
}

export default ObjOut;