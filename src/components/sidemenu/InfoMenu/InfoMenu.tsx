import React from "react";
import { useSeriesState } from "../../../context/series/SeriesContext";
import { useAppSelector } from "../../../redux/hooks";

const InfoMenu = () => {
  const images = useAppSelector((state) => state.imageLoader.images);
  const { currentSeries } = useSeriesState();

  const allSeriesInfo: any = images
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.series.seriesNumber === value.series.seriesNumber
        )
    )
    .filter((image) => image.series.seriesNumber === currentSeries)[0];

  console.log(allSeriesInfo);
  return (
    <div>
      {allSeriesInfo &&
        `${allSeriesInfo.patient.patientName}
        ${allSeriesInfo.series.seriesNumber}
        ${allSeriesInfo.series.seriesDate}
        ${allSeriesInfo.series.seriesTime}
        ${allSeriesInfo.series.seriesDescription}
        ${allSeriesInfo.study.studyID}
        ${allSeriesInfo.study.studyDescription}
        ${allSeriesInfo.study.studyDateTime}`}
    </div>
  );
};

export default InfoMenu;
