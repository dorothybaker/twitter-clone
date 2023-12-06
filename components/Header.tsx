import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="border-b-[1px] border-neutral-800 px-4 py-3">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            className="cursor-pointer hover:opacity-75 transition"
            color="white"
            size={20}
          />
        )}
        <h1 className="text-white text-xl font-medium">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
