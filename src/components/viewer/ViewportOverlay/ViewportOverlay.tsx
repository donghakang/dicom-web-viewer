import { PureComponent } from "react";
import React from "react";
import PropTypes from "prop-types";
import cornerstone from "cornerstone-core";
import dicomParser from "dicom-parser";
import { helpers } from "../../helper/overlay";
import * as Styled from "./style";
import { useAppSelector } from "../../../redux/hooks";

const { formatPN, formatDA, formatNumberPrecision, formatTM, isValidNumber } =
  helpers;

function getCompression(imageId: string) {
  const generalImageModule =
    cornerstone.metaData.get("generalImageModule", imageId) || {};
  const {
    lossyImageCompression,
    lossyImageCompressionRatio,
    lossyImageCompressionMethod,
  } = generalImageModule;

  if (lossyImageCompression === "01" && lossyImageCompressionRatio !== "") {
    const compressionMethod = lossyImageCompressionMethod || "Lossy: ";
    const compressionRatio = formatNumberPrecision(
      lossyImageCompressionRatio,
      2
    );
    return compressionMethod + compressionRatio + " : 1";
  }

  return "Lossless / Uncompressed";
}

export interface ViewportOverlayInterface {
  scale: number;
  windowWidth: number;
  windowCenter: number;
  imageId: string;
  imageIndex: number;
  stackSize: number;
}

const ViewportOverlay: React.FC<ViewportOverlayInterface> = (props) => {
  const { imageId, scale, windowWidth, windowCenter, imageIndex, stackSize } =
    props;

  const deidentification = useAppSelector(
    (state) => state.viewport.deidentification
  );
  if (!imageId) {
    return null;
  }

  const zoomPercentage = formatNumberPrecision(scale * 100, 0);
  const seriesMetadata =
    cornerstone.metaData.get("generalSeriesModule", imageId) || {};
  const imagePlaneModule =
    cornerstone.metaData.get("imagePlaneModule", imageId) || {};
  const { rows, columns, sliceThickness, sliceLocation } = imagePlaneModule;
  const { seriesNumber, seriesDescription } = seriesMetadata;

  const generalStudyModule =
    cornerstone.metaData.get("generalStudyModule", imageId) || {};
  const { studyDate, studyTime, studyDescription } = generalStudyModule;
  
  const patientModule =
    cornerstone.metaData.get("patientModule", imageId) || {};
  const { patientId, patientName } = patientModule;

  const generalImageModule =
    cornerstone.metaData.get("generalImageModule", imageId) || {};
  const { instanceNumber } = generalImageModule;

  const cineModule = cornerstone.metaData.get("cineModule", imageId) || {};
  const { frameTime } = cineModule;

  const frameRate = formatNumberPrecision(1000 / frameTime, 1);
  const compression = getCompression(imageId);
  const ww = windowWidth ? `W: ${windowWidth.toFixed(0)}` : '';
  const wc = windowCenter ? `L: ${windowCenter.toFixed(0)}` : '';
  const imageDimensions = `${columns} x ${rows}`;

  const normal = (
    <React.Fragment>
      <div className="top-left overlay-element">
        {!deidentification && (
          <>
            <div>{formatPN(patientName)}</div>
            <div>{patientId}</div>
          </>
        )}
      </div>
      <div className="top-right overlay-element">
        <div>{studyDescription}</div>
        <div>
          <>{!deidentification && formatDA(studyDate, 'MMM d, ')}</>
          {formatDA(studyDate, 'yyyy')} <>{!deidentification && formatTM(studyTime)}</>
        </div>
      </div>
      <div className="bottom-right overlay-element">
        <div>Zoom: {zoomPercentage}%</div>
        <div>{ww + '  ' + wc}</div>
        <div className="compressionIndicator">{compression}</div>
      </div>
      <div className="bottom-left overlay-element">
        <div>{seriesNumber >= 0 ? `Ser: ${seriesNumber}` : ""}</div>
        <div>
          {stackSize > 1
            ? `Img: ${instanceNumber} ${imageIndex}/${stackSize}`
            : ""}
        </div>
        <div>
          {frameRate >= 0 ? `${formatNumberPrecision(frameRate, 2)} FPS` : ""}
          <div>{imageDimensions}</div>
          <div>
            {isValidNumber(sliceLocation)
              ? `Loc: ${formatNumberPrecision(sliceLocation, 2)} mm `
              : ""}
            {sliceThickness
              ? `Thick: ${formatNumberPrecision(sliceThickness, 2)} mm`
              : ""}
          </div>
          <div>{seriesDescription}</div>
        </div>
      </div>
    </React.Fragment>
  );

  return <Styled.ViewportOverlay>{normal}</Styled.ViewportOverlay>;
};

export default ViewportOverlay;
