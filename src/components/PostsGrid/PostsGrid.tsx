import Image from "next/image";
import React, { ReactElement, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import PostsGridItem from "../PostsGridItem";

type PostsGridPropsType = {
  q: any; // TODO
  loadMoreCallback?: () => void;
};

export function PostsGrid({
  q,
  loadMoreCallback,
}: PostsGridPropsType): ReactElement {
  // const setError = useErrorStore((state) => state.setError);
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [docsLength, setDocsLength] = useState<number>(0);
  const [docs, setDocs] = useState<any[]>([]); // TODO

  const [result, loading, loadError] = useCollection(q);

  useEffect(() => {
    // only applicable to posts grids with a load more button
    const hasSameLength =
      loadMoreCallback && docs && docsLength && docs.length === docsLength;
    if (hasSameLength) {
      // setError(true, "No more posts to load!");
      setDisableLoadMore(true);
    } else {
      setDocsLength(docs.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docs]);

  useEffect(() => {
    if (result) {
      const docs = result.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
      setDocs(docs);
      setLoadMore(false);
    } else {
      setLoadMore(true); // hacky workaround to ensure "no cats" message doesn't show if not needed
    }
  }, [result]);

  useEffect(() => {
    if (loadError) {
      // setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadError]);

  const handleLoadMore = () => {
    if (loadMoreCallback) {
      setLoadMore(true);
      loadMoreCallback();
      setLoadMore(loading);
    }
  };

  return (
    <div className="container mx-auto">
      {!!docsLength && (
        <div className="grid-cols-3">
          {docs.map((item) => (
            <PostsGridItem key={item.id} item={item} />
          ))}
        </div>
        // <ImageList sx={styles.imageList} cols={3} rowHeight="auto">
        //   {docs.map((item) => (
        //     <PostsGridItem key={item.id} item={item} />
        //   ))}
        // </ImageList>
      )}
      {/* {!docsLength && !loading && !loadMore && (
        <Typography variant="body1">No cats yet...</Typography>
      )}
      {(loading || loadMore) && (
        <Container sx={styles.container}>
          <CircularProgress color="secondary" />
          <Typography variant="body1">
            Fetching some cat pictures for you...
          </Typography>
        </Container>
      )}
      {!!loadMoreCallback && !!docsLength && (
        <Button
          variant="contained"
          onClick={handleLoadMore}
          disabled={disableLoadMore}
        >
          Load More
        </Button>
      )} */}
    </div>
  );
}
