import React, { useEffect, useState } from "react";
import { setImages } from "../../redux/reducers/imageSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as Styled from "./style";
import { useSeriesDispatch } from "../../context/series/SeriesContext";

import { dicomDatasetToCornerstone, generateDicomData, generateImageId, loadFile } from "../helper/dicomFileReader";

interface ProgressInterface {
  files: File[];
}

const ProgressBar: React.FC<ProgressInterface> = ({ files }) => {
  const [progress, setProgress] = useState<number>(0);
  const step = 100 / files.length;
  const dispatch = useAppDispatch();
  const seriesDispatch = useSeriesDispatch();

  async function loadWADOImages(files: File[]) {
    let items: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageId = generateImageId(file);
      const image = await loadFile(imageId)
      const dataset = generateDicomData(image);

      const dicomInfo = dicomDatasetToCornerstone(imageId, dataset);

      items.push(dicomInfo);
      setProgress((prev) => prev + step);
    }
    items.sort((l, r) => {
      return l.instanceNumber - r.instanceNumber;
    });

    // series sort
    const allSeriesInfo = items
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.series.seriesNumber === value.series.seriesNumber
          )
      )
      .sort((a, b) => a.series.seriesNumber - b.series.seriesNumber);

    const currentSeries =
      allSeriesInfo.length > 0 ? allSeriesInfo[0].series.seriesNumber : 0;
    const seriesInfo = allSeriesInfo.map((series) => {
      return {
        seriesNumber: series.series.seriesNumber,
        seriesDescription: series.series.seriesDescription,
        countImages: items.filter(
          (item) => item.series.seriesNumber === series.series.seriesNumber
        ).length,
      };
    });


    seriesDispatch({
      type: "SET_CURRENT_SERIES",
      currentSeries: currentSeries,
    });
    seriesDispatch({ type: "SET_SERIES", series: seriesInfo });

    dispatch(setImages(items));

    setProgress(0);
  }

  useEffect(() => {
    loadWADOImages(files);
  }, [files]);

  return <Styled.ProgressBar progress={progress}></Styled.ProgressBar>;
};

export default ProgressBar;
