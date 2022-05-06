import React from 'react';
import { BsLockFill } from 'react-icons/bs';
import { theme } from '../../../assets/styles/theme';
import { useSeriesState } from '../../../context/series/SeriesContext';
import { useAppSelector } from '../../../redux/hooks';

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
  const { deidentification } = useAppSelector((state) => state.viewport);
  const { currentSeries } = useSeriesState();

  const allSeriesInfo: any = images.find((image) => image.id === currentSeries)
    ?.data[0];

  return (
    <div className="content-container">
      <>
        {!deidentification ? (
          <>
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
          </>
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: theme.color.primary,
            }}
          >
            <BsLockFill size={40} />
            <span style={{ marginTop: '1rem' }}>DEIDENTIFIED</span>
          </div>
        )}
      </>
    </div>
  );
};

export default InfoMenu;
