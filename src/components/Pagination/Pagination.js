import React from "react";

const Pagination = ({ nextPage, prevPage, currentPage }) => {

    return (
        <div>
            <ul className="pagination">
                <button className="pagination__button" onClick={prevPage}>Назад</button>
                <h2 className="pagination__page-number">{currentPage}</h2>
                <button className="pagination__button" onClick={nextPage}>Вперёд</button>
            </ul>
        </div>
    )
}

export default Pagination;