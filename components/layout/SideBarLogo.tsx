import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

const SideBarLogo = () => {
  const router = useRouter();
  return (
    <div
      className="rounded-full h-10 w-10 p-2 hover:bg-blue-300/10 flex items-center justify-center cursor-pointer transition"
      onClick={() => router.push("/")}
    >
      <BsTwitter color="white" size={28} />
    </div>
  );
};

export default SideBarLogo;
