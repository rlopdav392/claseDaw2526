import { CommentWithMetadata } from "../queries/get-comments";

export function CommentItem({ comment }: { comment: CommentWithMetadata }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {comment.username} · {comment.createdAt} · id={comment.id}
      </div>
      <div>{comment.content}</div>
    </div>
  );
}
