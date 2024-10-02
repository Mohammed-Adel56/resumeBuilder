import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md">
      <Link to="/">
        <img src="/logo.svg" alt="logo" width={30} height={30} />
      </Link>
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>

          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
