import PropTypes from 'prop-types';

import CustomButton from '../../CustomButton/CustomButton';

import s from './Memorials.module.scss';
import { useEffect, useState } from 'react';

Memorials.propTypes = {
    currentMemo: PropTypes.array.isRequired,
    moreInfo: PropTypes.func.isRequired,
};

export default function Memorials({ currentMemo, moreInfo }) {
    const [memorials, setMemorials] = useState([]);

    const checkLength = (string, count) => {
        let checked;
        string.length <= count ? checked = string : checked = string.substring(0, count - 3) + '...';
        return checked
    };

    useEffect(() => {
        setMemorials(currentMemo)
    }, [currentMemo])


    return (
        <div className={s.memorial}>
            {
                memorials.map((item, index) => (
                    <div className={s.item} key={index}>
                        <div className={s.trident}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="230" height="361" viewBox="0 0 230 361" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M115 0C106.087 9.54635 100.625 22.0717 100.625 35.7481C101.2 65.8766 105.081 95.9375 105.44 126.066C106.159 154.096 97.2467 180.433 86.3936 206.093C82.728 213.202 78.8467 220.175 74.8936 227.149L63.3936 224.915C52.9717 222.951 46.2155 213.473 48.2999 203.723C50.1686 195.125 58.1467 189.234 67.0592 189.167L71.228 189.573L61.8843 116.046C58.7936 83.2767 40.8967 54.5023 14.4469 35.7483C9.84687 32.5662 5.03124 29.6548 0 27.0144V288.488H64.1125C68.9282 312.998 83.2313 334.325 103.356 349.016C108.172 352.063 112.125 356.193 115 361C117.875 356.193 121.828 352.063 126.644 349.016C146.769 334.324 161.072 312.997 165.887 288.488H230V27.0144C224.969 29.6549 220.153 32.5662 215.553 35.7483C189.103 54.5024 171.206 83.2769 168.116 116.046L158.772 189.573L162.941 189.167C171.853 189.234 179.831 195.125 181.7 203.723C183.785 213.473 177.028 222.951 166.606 224.915L155.106 227.149C151.153 220.175 147.272 213.202 143.606 206.093C132.753 180.433 123.841 154.096 124.56 126.066C124.919 95.9375 128.8 65.8766 129.375 35.7481C129.375 22.0718 123.912 9.54637 115 0ZM19.1905 64.7257C31.6249 78.402 39.9623 95.4635 42.4061 114.285L50.0967 175.016C40.3217 179.62 32.8467 188.016 30.0436 198.171H19.1905V64.7257ZM210.809 64.7257V198.171H199.956C197.153 188.016 189.678 179.62 179.903 175.017L187.594 114.285C190.037 95.4636 198.375 78.402 210.809 64.7257ZM115 186.729C120.103 202.572 127.219 217.603 135.987 231.617C127.65 234.055 120.319 238.726 115 244.955C109.681 238.659 102.35 234.055 94.0124 231.617C102.781 217.603 109.897 202.572 115 186.729ZM19.1905 216.249H30.0436C33.4936 228.706 43.7717 238.591 56.9249 241.976L66.1249 244.007C63.6811 252.403 62.3155 261.272 62.3155 270.412H19.1907L19.1905 216.249ZM199.956 216.249H210.809V270.412H167.684C167.684 261.272 166.319 252.403 163.875 244.007L173.075 241.976C186.156 238.591 196.506 228.706 199.956 216.249ZM84.8842 248.138C96.456 249.695 105.44 259.038 105.44 270.412H81.506C81.506 262.694 82.7279 255.247 84.8842 248.138ZM145.115 248.138C147.272 255.247 148.493 262.694 148.493 270.412H124.559C124.559 259.038 133.543 249.695 145.115 248.138ZM83.6621 288.489H105.44V326.472C94.8746 316.045 87.1839 302.978 83.6621 288.489ZM124.559 288.489H146.337C142.815 302.978 135.125 316.045 124.559 326.472V288.489Z" fill="white" fillOpacity="0.25" />
                            </svg>
                        </div>
                        <div className={s.item_left} style={{ backgroundImage: `url(${item.image})` }}> </div>
                        <div className={s.item_rigth}>
                            <div className={s.item_name}>{checkLength(item.name, 70)} </div>
                            <div className={s.item_age}> {checkLength(item.age, 48)} </div>
                            <div className={s.item_position}>{checkLength(item.position, 48)} </div>
                            <div className={s.btn} onClick={() => moreInfo(item)}>
                                <CustomButton text="додаткова інформація" noArrow white />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
