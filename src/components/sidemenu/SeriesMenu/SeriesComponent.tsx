import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import CornerstoneViewport from 'react-cornerstone-viewport';
import * as Styled from '../style';
import {
  useSeriesDispatch,
  useSeriesState,
} from '../../../context/series/SeriesContext';
import { BiBookAlt, BiImages } from 'react-icons/bi';

interface ViewportOverlayInterface {
  scale: number;
  windowWidth: number;
  windowCenter: number;
  imageId: string;
  imageIndex: number;
  stackSize: number;
}

const SeriesComponent: React.FC<{
  seriesInfo: {
    id: number;
    patient_id: string;
    series_id: string;
    isImage: boolean;
    data: any[];
  };
}> = ({ seriesInfo }) => {
  const dispatch = useSeriesDispatch();

  console.log('💡', seriesInfo);

  const { currentSeries } = useSeriesState();

  function getPreviewImage() {
    const filteredImageId =
      seriesInfo.data[Math.floor(seriesInfo.data.length / 2)].imageId;

    return filteredImageId;
  }

  function handleSeriesClick(currentSeries: number) {
    dispatch({
      type: 'SET_CURRENT_SERIES',
      currentSeries: currentSeries,
    });
  }

  return (
    <Styled.SeriesComponent>
      {seriesInfo.isImage ? (
        <div
          className={`viewport-container ${
            currentSeries === seriesInfo.id && 'active'
          }`}
          onClick={() => handleSeriesClick(seriesInfo.id)}
        >
          <CornerstoneViewport
            key={0}
            style={{ width: '240px', height: '180px' }}
            imageIds={[getPreviewImage()]}
            tools={[]}
            viewportOverlayComponent={(props: ViewportOverlayInterface) => (
              <></>
            )}
          />
        </div>
      ) : (
        <div
          className={`viewport-container ${
            currentSeries === seriesInfo.id && 'active'
          }`}
          onClick={() => handleSeriesClick(seriesInfo.id)}
        >
          <div className="no-pixel-data-viewport">
            <span>NO PIXEL DATA</span>
          </div>
        </div>
      )}

      <div className="series-description-container">
        <div className="series-description">
          {seriesInfo.data[0].series.seriesDescription}
        </div>
        <div>
          <div>
            <BiBookAlt size={16} />
            <span>{seriesInfo.data[0].series.seriesNumber}</span>
          </div>
          <div>
            <BiImages size={16} />
            <span>{seriesInfo.data.length}</span>
          </div>
        </div>
      </div>
    </Styled.SeriesComponent>
  );
};

export default SeriesComponent;
