import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { FaRegCommentDots } from "react-icons/fa";
import useLike from "@/hooks/useLike";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const Icon = hasLiked ? AiFillHeart : AiOutlineHeart;
  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-700 p-3 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-2">
        <div>
          <Avatar userId={data.user.id} />
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              className="text-white font-medium hover:underline"
              onClick={goToUser}
            >
              {data.user.name.length > 11 && window.screen.availWidth < 400
                ? data.user.name.slice(0, 11) + "..."
                : data.user.name}
            </p>
            <span
              className="text-neutral-500 hidden md:block cursor-pointer"
              onClick={goToUser}
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt} ago</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-1 gap-7">
            <div className="flex flex-row items-center text-neutral-500 cursor-pointer transition gap-1 font-medium">
              <FaRegCommentDots size={20} className="text-sky-500" />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              className="flex flex-row items-center text-neutral-500 cursor-pointer transition gap-1 font-medium"
              onClick={onLike}
            >
              <Icon size={20} color="red" />
              <p>{data.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
