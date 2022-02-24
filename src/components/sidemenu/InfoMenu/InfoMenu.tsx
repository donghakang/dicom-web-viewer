import React from "react";
import { useSeriesState } from "../../../context/series/SeriesContext";
import { useAppSelector } from "../../../redux/hooks";

interface InfoState {
  patientName: string;
  seriesNumber: string;
  seriesDate: string;
  seriesTime: string;
  seriesDescription: string;
  studyID: string;
  studyDescription: string;
  studyDateTime: string;
}

const InfoSection: React.FC<InfoState> = (props) => {
  return (
    <table>
      <tbody>
        {props.patientName && (
          <tr>
            <th>Patient Name</th>
            <td>{props.patientName}</td>
          </tr>
        )}
        {props.seriesNumber && (
          <tr>
            <th>Series Number</th>
            <td>{props.seriesNumber}</td>
          </tr>
        )}
        {props.seriesDate && (
          <tr>
            <th>Series Date</th>
            <td>{props.seriesDate}</td>
          </tr>
        )}
        {props.seriesTime && (
          <tr>
            <th>Series Time</th>
            <td>{props.seriesTime}</td>
          </tr>
        )}
        {props.seriesDescription && (
          <tr>
            <th>Series Description</th>
            <td>{props.seriesDescription}</td>
          </tr>
        )}
        {props.studyID && (
          <tr>
            <th>Study ID</th>
            <td>{props.studyID}</td>
          </tr>
        )}
        {props.studyDescription && (
          <tr>
            <th>Study Description</th>
            <td>{props.studyDescription}</td>
          </tr>
        )}
        {props.studyDateTime && (
          <tr>
            <th>Study Date &amp; Time</th>
            <td>{props.studyDateTime}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

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

  // console.log(allSeriesInfo);
  return (
    <div className="content-container">
      {allSeriesInfo && (
        <InfoSection
          patientName={allSeriesInfo.patient.patientName}
          seriesNumber={allSeriesInfo.series.seriesNumber}
          seriesDate={allSeriesInfo.series.seriesDate}
          seriesTime={allSeriesInfo.series.seriesTime}
          seriesDescription={allSeriesInfo.series.seriesDescription}
          studyID={allSeriesInfo.study.studyID}
          studyDescription={allSeriesInfo.study.studyDescription}
          studyDateTime={allSeriesInfo.study.studyDateTime}
        />
      )}
    </div>
  );
};

export default InfoMenu;
