import React from 'react'

function Card({...props}) {
    if(!props.cards || props.cards.length === 0) {
        return <p>Загрузка...</p>
    }
    return (
        <div className='card_box'>
            {props.cards.map((card,id) => (
                <div key={id} className='card'>
                    <p className='text_1'>id: {card.id}</p>
                    <p className='text_1'>Full name: {card.fullName}</p>
                    <p className='text_1'>Name:<br/></p>
                    <p className='text_2'><br/>First name: {card.name.firstName}</p>
                    <p className='text_2'>LastName: {card.name.lastName}</p>
                    <p className='text_1'><br/>Address:</p>
                    <p className='text_2'><br/>Line: {card.address.line1}</p>
                    <p className='text_2'>Town: {card.address.town}</p>
                    <p className='text_2'>County: {card.address.county}</p>
                    <p className='text_2'>Country: {card.address.country}</p>
                    <p className='text_1'><br/>Email: {card.email}</p>
                </div>
            ))}
        </div>
    );
}

export default Card;