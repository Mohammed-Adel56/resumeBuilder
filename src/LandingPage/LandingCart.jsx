const LandingCart = ({ title, icon }) => {
  return (
    <div className="shadow-lg p-5">
      {icon}
      <h3 className="font-extrabold text-center p-3 text-xl">{title}</h3>
      <p className="text-sm text-gray-500">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  );
};

export default LandingCart;
