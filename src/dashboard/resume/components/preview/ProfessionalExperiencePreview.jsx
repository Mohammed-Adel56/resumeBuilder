const ProfessionalExperiencePreview = ({ resumeInfo }) => {
  return resumeInfo && resumeInfo?.experience?.length > 0 ? (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo &&
        resumeInfo?.experience?.map((elem, i) => {
          return (
            <div key={i} className="my-5">
              <h2
                className="text-sm font-bold "
                style={{ color: resumeInfo?.themeColor }}
              >
                {elem?.title}
              </h2>
              <h2 className="text-xs flex justify-between">
                {elem?.companyName} , {elem?.city} , {elem?.state}
                <span>
                  {new Date(elem?.startDate).toDateString().slice(4)} To{" "}
                  {elem?.currentlyWorking
                    ? "Present"
                    : new Date(elem?.endDate).toDateString().slice(4)}
                </span>
              </h2>
              {/* <p className="text-xs my-2">{elem?.workSummery}</p> */}
              <div dangerouslySetInnerHTML={{ __html: elem?.workSummery }} />
            </div>
          );
        })}
    </div>
  ) : (
    <div></div>
  );
};

export default ProfessionalExperiencePreview;
