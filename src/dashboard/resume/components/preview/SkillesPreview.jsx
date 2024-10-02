const SkillesPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo &&
        resumeInfo?.skills?.map((elem, i) => (
          <div key={i} className="flex items-center justify-between my-3 ">
            <h2 className="text-xs">{elem?.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                id="skill"
                style={{
                  backgroundColor: resumeInfo?.themeColor || "#ff6666",
                  width: elem?.rating * 20 + "%",
                }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkillesPreview;
