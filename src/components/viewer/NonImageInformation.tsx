import React from 'react';

const NonImageInformation: React.FC<{
  image:
    | {
        id: number;
        patient_id: string;
        series_id: string;
        isImage: boolean;
        data: any[];
      }
    | undefined;
}> = ({ image }) => {
  console.log(image);

  return (
    <>
      {image !== undefined && (
        <div>
          <h1>{image.data[0].meta.ConceptNameCodeSequence[0].CodeMeaning}</h1>
          <div className="text-value">
            {image.data[0].meta.ContentSequence[0].TextValue.split('.').map(
              (text: string, idx: number) => (
                <span key={idx}>{text}</span>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NonImageInformation;
