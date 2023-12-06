import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }
  return (
    <div className="px-3 py-3 hidden lg:block lg:w-[230px]">
      <div className="bg-neutral-800 rounded-xl p-3">
        <h2 className="text-white text-xl font-medium">Who to follow</h2>
        <div className="flex flex-col gap-4 mt-4">
          {users.map((user: Record<string, any>) => {
            return (
              <div className="flex flex-row gap-4" key={user.id}>
                <Avatar userId={user.id} />
                <div className="flex flex-col text-white text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-neutral-400">@{user.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
