import React from 'react';

function Card(props) {
    return (
        <li className="card">
            <div className="card__container">
                <h2 className='card__title'>{props.card.product}</h2>
            </div>
            <div className="card__container">
                <h2 className='card__price'>{props.card.price}</h2>
            </div>
            <div className="card__container">
                <h2 className='card__brand'>{props.card.brand}</h2>
            </div>
        </li>
    )
}

export default Card;