import React from 'react';
import css from './virtual.module.css';
import ReactCompareImage from 'react-compare-image';
import Before from '../../assets/before.png';
import After from '../../assets/after.png';

const Virtual = () => {
  return (
    <div className={css.virtual}>
        <div className={css.left}>
            <span>Genz Inspo</span>
            <span>What's hot in Genz World?</span>
            <span>Genz Fashion Inspiration!</span>
        </div>
        
        <div className={css.right}>
            <div className={css.wrapper}>
                <ReactCompareImage leftImage={Before} rightImage={After} sliderLineColor='#000'/>
            </div>
        </div>
    </div>
  );
}

export default Virtual;