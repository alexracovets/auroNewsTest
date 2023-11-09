import PropTypes from 'prop-types';

import s from './Pagination.module.scss';

Pagination.propTypes = {
    memoPerPage: PropTypes.number.isRequired,
    totalMemo: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default function Pagination({ memoPerPage, totalMemo, paginate, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalMemo / memoPerPage); i++) {
        pageNumbers.push(i)
    }

    const numbers = () => pageNumbers.map(number => (
        <li key={number} className={currentPage === number ? s.page_link + ' ' + s.active : s.page_link} onClick={() => paginate(number)}>
            <a className={currentPage === number ? s.page_link + ' ' + s.active : s.page_link} >
                {number}
            </a>
        </li>
    ))

    return (
        <div className={s.pagination_wrapper}>
            <button className={s.arrow} onClick={() => paginate(currentPage === 1 ? currentPage : --currentPage)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="23" viewBox="0 0 11 23" fill="none">
                    <path d="M1.87994 11.5L10.7716 1.90583C10.8448 1.82852 10.9027 1.73672 10.9419 1.63577C10.9811 1.53481 11.0008 1.42669 11 1.31767C10.9991 1.20866 10.9777 1.1009 10.9369 1.00064C10.8961 0.900381 10.8368 0.809611 10.7623 0.733581C10.6879 0.657552 10.5999 0.597773 10.5033 0.557705C10.4067 0.517637 10.3036 0.498074 10.1998 0.500149C10.0959 0.502225 9.99354 0.525897 9.89849 0.569795C9.80345 0.613694 9.71764 0.676948 9.64603 0.755896L0.222437 10.925C0.0798035 11.079 -9.53674e-07 11.2852 -9.53674e-07 11.5C-9.53674e-07 11.7148 0.0798035 11.921 0.222437 12.075L9.64603 22.2441C9.71764 22.3231 9.80345 22.3863 9.89849 22.4302C9.99354 22.4741 10.0959 22.4978 10.1998 22.4999C10.3036 22.5019 10.4067 22.4824 10.5033 22.4423C10.5999 22.4022 10.6879 22.3425 10.7623 22.2664C10.8368 22.1904 10.8961 22.0996 10.9369 21.9994C10.9777 21.8991 10.9991 21.7913 11 21.6823C11.0008 21.5733 10.9811 21.4652 10.9419 21.3642C10.9027 21.2633 10.8448 21.1715 10.7716 21.0942L1.87994 11.5Z" fill="black" fillOpacity={currentPage === 1 ? 0.35 : 1} />
                </svg>
            </button>
            <ul className={s.pagination}>
                {numbers()}
            </ul >
            <button className={s.arrow} onClick={() => paginate(currentPage === pageNumbers.length ? currentPage : ++currentPage)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="23" viewBox="0 0 11 23" fill="none">
                    <path d="M9.12006 11.5L0.228377 1.90583C0.15517 1.82852 0.0972944 1.73672 0.0580983 1.63577C0.0189023 1.53481 -0.000835492 1.42669 2.70997e-05 1.31767C0.000889691 1.20866 0.022335 1.1009 0.0631231 1.00064C0.103911 0.900381 0.163232 0.809611 0.237652 0.733581C0.312072 0.657552 0.400114 0.597773 0.496683 0.557705C0.593252 0.517637 0.696431 0.498074 0.800248 0.500149C0.904065 0.502225 1.00646 0.525897 1.10151 0.569795C1.19655 0.613694 1.28236 0.676948 1.35397 0.755896L10.7776 10.925C10.9202 11.079 11 11.2852 11 11.5C11 11.7148 10.9202 11.921 10.7776 12.075L1.35397 22.2441C1.28236 22.3231 1.19655 22.3863 1.10151 22.4302C1.00646 22.4741 0.904065 22.4978 0.800248 22.4999C0.696431 22.5019 0.593252 22.4824 0.496683 22.4423C0.400114 22.4022 0.312072 22.3425 0.237652 22.2664C0.163232 22.1904 0.103911 22.0996 0.0631231 21.9994C0.022335 21.8991 0.000889691 21.7913 2.70997e-05 21.6823C-0.000835492 21.5733 0.0189023 21.4652 0.0580983 21.3642C0.0972944 21.2633 0.15517 21.1715 0.228377 21.0942L9.12006 11.5Z" fill="black" fillOpacity={currentPage === pageNumbers.length ? 0.35 : 1} />
                </svg>
            </button>
        </div>
    )
}
