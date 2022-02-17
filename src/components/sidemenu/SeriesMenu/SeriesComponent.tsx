import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import CornerstoneViewport from "react-cornerstone-viewport";
import { ViewportOverlayInterface } from "../../viewer/ViewportOverlay/ViewportOverlay";
import * as Styled from "../style";
import {
  useSeriesDispatch,
  useSeriesState,
} from "../../../context/series/SeriesContext";
import { BiBookAlt, BiImages } from "react-icons/bi";
const SeriesComponent: React.FC<{
  seriesInfo: {
    seriesNumber: number;
    seriesDescription: string;
    countImages: number;
  };
}> = ({ seriesInfo }) => {
  const images = useAppSelector((state) => state.imageLoader.images);
  const dispatch = useSeriesDispatch();
  const { currentSeries } = useSeriesState();

  function getPreviewImage() {
    const filteredImage = images.filter(
      (image) => image.series.seriesNumber === seriesInfo.seriesNumber
    );

    return filteredImage[filteredImage.length / 2].imageId;
  }

  return (
    <Styled.SeriesComponent
      onClick={() =>
        dispatch({
          type: "SET_CURRENT_SERIES",
          currentSeries: seriesInfo.seriesNumber,
        })
      }
    >
      <div
        className={`viewport-container ${
          currentSeries === seriesInfo.seriesNumber && "active"
        }`}
      >
        <CornerstoneViewport
          key={0}
          style={{ width: "240px", height: "180px" }}
          imageIds={[getPreviewImage()]}
          tools={[]}
          viewportOverlayComponent={(props: ViewportOverlayInterface) => <></>}
        />
      </div>
      <div className="series-description-container">
        <div className="series-description">{seriesInfo.seriesDescription}</div>
        <div>
          <div>
            <BiBookAlt size={16} />
            <span>{seriesInfo.seriesNumber}</span>
          </div>
          <div>
            <BiImages size={16} />
            <span>{seriesInfo.countImages}</span>
          </div>
        </div>
      </div>
    </Styled.SeriesComponent>
  );
};

export default SeriesComponent;
