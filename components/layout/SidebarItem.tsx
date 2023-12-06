import { IconType } from "react-icons";
import React, { useCallback } from "react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  label,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, loginModal, auth]);
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-300/10 p-2 relative cursor-pointer lg:hidden">
        <Icon size={24} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 -left-1" size={60} />
        ) : null}
      </div>
      <div className="relative hidden lg:flex items-center gap-4 hover:bg-slate-300/10 cursor-pointer p-2 rounded-full w-full">
        <Icon size={24} color="white" />
        <p className="text-white text-xl font-medium">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 -left-1" size={60} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
