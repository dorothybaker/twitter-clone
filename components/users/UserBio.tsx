import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

import { format } from "date-fns";
import { useMemo } from "react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  let following;

  function followFilter(theId: string) {
    return theId !== currentUser?.id;
  }

  if (currentUser?.id === userId) {
    following = currentUser?.followingIds.filter(followFilter);
  } else {
    following = fetchedUser?.followingIds;
  }

  const uniqueFollowing = new Set(following);
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            secondary={!isFollowing}
            outline={isFollowing}
            label={isFollowing ? "Unfollow" : "Follow"}
            onClick={toggleFollow}
          />
        )}
      </div>
      <div className="mt-5 px-3">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-medium">{fetchedUser?.name}</p>
          <p className="text-neutral-400">@{fetchedUser?.username}</p>
        </div>
        <div className="mt-3 flex flex-col">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
            <BiCalendar size={24} /> Joined {createdAt}
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 mt-4">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{following?.length || 0}</p>
            <p className="text-neutral-400">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-400">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
