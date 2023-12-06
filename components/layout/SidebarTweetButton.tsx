import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push("/");
  }, [router]);
  return (
    <div onClick={onClick}>
      <div className="lg:hidden flex justify-center items-center h-10 w-10 p-2 bg-sky-500 cursor-pointer transition hover:bg-opacity-80 mt-6 rounded-full">
        <FaFeather size={20} color="white" />
      </div>
      <div className="mt-6 hidden lg:flex justify-center py-2 bg-sky-500 cursor-pointer transition hover:bg-opacity-80 rounded-full">
        <p className="text-white text-xl font-medium">Tweet</p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
