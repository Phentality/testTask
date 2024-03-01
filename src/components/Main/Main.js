import React from 'react';
import Card from '../Card/Card';

function Main(props) {
    const valueRef = React.useRef('');
    const [formValue, setFormValue] = React.useState({
        price: '',
        product: '',
        brand: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    function handlePriceSubmit(e) {
        e.preventDefault();

        props.priceFilter(formValue.price);
    }

    function handleProductSubmit(e) {
        e.preventDefault();

        props.productFilter(formValue.product);
    }

    function handleBrandSubmit(e) {
        e.preventDefault();

        props.brandFilter(formValue.brand);
    }


    return (
        <main className='main'>
            <div className="main__button-container">
                <button className='main__button' onClick={props.click}>Все товары</button>
                <form className='main__filter' onSubmit={handlePriceSubmit} noValidate>
                    <input className='main__filter-value'
                        id='price'
                        name='price'
                        placeholder='Цена'
                        ref={valueRef}
                        onChange={handleChange}
                    />
                    <button disabled={!formValue.price} className='main__filter-button' type="submit" aria-label='Поиск' name="priceSearch">Поиск</button>
                </form>
                <form className='main__filter' onSubmit={handleProductSubmit} noValidate>
                    <input className='main__filter-value'
                        id='product'
                        name='product'
                        placeholder='Продукт'
                        ref={valueRef}
                        onChange={handleChange}
                    />
                    <button disabled={!formValue.product} className='main__filter-button' type="submit" aria-label='Поиск' name="productSearch">Поиск</button>
                </form>
                <form className='main__filter' onSubmit={handleBrandSubmit} noValidate>
                    <input className='main__filter-value'
                        id='brand'
                        name='brand'
                        placeholder='Бренд'
                        ref={valueRef}
                        onChange={handleChange}
                    />
                    <button disabled={!formValue.brand} className='main__filter-button' type="submit" aria-label='Поиск' name="brandSearch">Поиск</button>
                </form>
            </div>
            <div className='main__products'>
                <ul className='main__card-list'>
                    {props.products.map((card) => <Card key={card.id} card={card} />)}
                </ul>
            </div>
        </main>
    )
}

export default Main;
