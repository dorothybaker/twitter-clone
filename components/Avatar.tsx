import useUser from "@/hooks/useUser";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`${isLarge ? "h-[92px] w-[92px]" : "h-10 w-10"} ${
        hasBorder ? "border-2 border-black" : ""
      } rounded-full relative cursor-pointer transition hover:opacity-90`}
    >
      <Image
        src={fetchedUser?.profileImage || "/placeholder.png"}
        fill
        priority
        onClick={onClick}
        alt="Avatar"
        style={{ objectFit: "cover", borderRadius: "100%" }}
      />
    </div>
  );
};

export default Avatar;
