const EducationalPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo &&
        resumeInfo?.education?.map((elem, i) => (
          <div key={i} className="my-5">
            <h2
              className="text-sm font-bold"
              style={{ color: resumeInfo?.themeColor }}
            >
              {elem?.universityName}
            </h2>
            <h2 className="text-xs flex justify-between">
              {elem?.degree} in {elem?.major}
              <span>
                {elem?.startDate} to {elem.endDate}
              </span>
            </h2>
            <p className="text-xs my-2"> {elem?.description}</p>
          </div>
        ))}
    </div>
  );
};

export default EducationalPreview;
