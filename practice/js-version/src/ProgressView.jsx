import React, { useEffect, useState } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

const ProgressView = ({ files }) => {
  const [progress, setProgress] = useState(0);
  
  let imageIds = []

  for ( let i = 0; i < files.length; i ++ ) {
    const file = files[i]
    imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(file))
  }

  console.log('ImageIds', imageIds)
  for ( let i = 0; i < files.length; i ++ ) {
    cornerstone.loadImage("dicomfile:0").then((imageId) => {
      console.log(imageId)
    })
  }



  // images.map((image) => {
  //   cornerstone.loadImage(image).then((img: any) => {
  //     console.log("⚠️", img);

  //     // const patientName = getDicomPatientName(image)

  //     // const studyId = getDicomStudyId(image)
  //     // const studyDate = getDicomStudyDate(image)
  //     // const studyTime = getDicomStudyTime(image)
  //     // const studyDescription = getDicomStudyDescription(image)

  //     // const seriesDate = getDicomSeriesDate(image)
  //     // const seriesTime = getDicomSeriesTime(image)
  //     // const seriesDescription = getDicomSeriesDescription(image)
  //     // const seriesNumber = getDicomSeriesNumber(image)

  //     // const instanceNumber = getDicomInstanceNumber(image)
  //     // const sliceDistance = getDicomSliceDistance(image)
  //     // const echoNumber = getDicomEchoNumber(image)
  //     // const sliceLocation = getDicomSliceLocation(image)
  //     // const columns = getDicomColumns(image)
  //     // const rows = getDicomRows(image)

  //     // const studyDateTime = studyDate === undefined ? undefined : dicomDateTimeToLocale(`${studyDate}.${studyTime}`)
  //   });
  // });

  return <div>Loading {progress}</div>;
};

export default ProgressView;
