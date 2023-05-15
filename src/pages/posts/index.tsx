import { useState } from "react";
import {
  query,
  collection,
  orderBy,
  getFirestore,
  limit,
} from "firebase/firestore";
import { PostsGrid } from "@/components";

const db = getFirestore();

export default function Posts() {
  const [count, setCount] = useState(1);

  const q = query(
    collection(db, "posts"),
    orderBy("likes", "desc"),
    limit(count * 12)
  );

  const handleLoadMoreImages = () => {
    setCount((count) => count + 1);
  };

  return (
    <div>
      <PostsGrid q={q} loadMoreCallback={handleLoadMoreImages} />
    </div>
  );
}
