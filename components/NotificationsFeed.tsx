import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-500 text-center text-xl p-5">
        No notifications
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => {
        return (
          <div
            className="flex flex-row items-center gap-3 p-3 border-b-[1px] border-neutral-800"
            key={notification.id}
          >
            <BsTwitter color="white" size={22} />
            <p className="text-white">{notification.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsFeed;
