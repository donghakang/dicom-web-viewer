import React from 'react';
import * as Styled from './style';
import { useAppSelector } from '../../redux/hooks';
import { useSideMenuState } from '../../context/menubar/MenubarContext';
import { useSeriesState } from '../../context/series/SeriesContext';
import SeriesComponent from './SeriesMenu/SeriesComponent';

const variants = {
  hidden: { x: '-320px', transition: { ease: 'easeInOut' } },
  // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
  visible: { x: '0px', transition: { ease: 'easeInOut' } },
};

const LeftSideMenu: React.FC = () => {
  const { leftSideMenuOpened } = useSideMenuState();
  const images = useAppSelector((state) => state.imageLoader.images);
  return (
    <Styled.LeftSideMenu
      variants={variants}
      initial="hidden"
      animate={leftSideMenuOpened ? 'visible' : 'hidden'}
    >
      {images.length > 0 ? (
        images.map((seriesInfo, idx) => (
          <SeriesComponent key={idx} seriesInfo={seriesInfo} />
        ))
      ) : (
        <></>
      )}
    </Styled.LeftSideMenu>
  );
};

export default LeftSideMenu;
