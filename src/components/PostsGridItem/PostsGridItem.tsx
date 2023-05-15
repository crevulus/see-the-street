import Image from "next/image";
import React, { ReactElement } from "react";

import { getStorage, ref } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { firebaseApp } from "@/firebase";
import LoadingSpinner from "../LoadingSpinner";

const storage = getStorage(firebaseApp);

type PostsGridItemPropsType = {
  item: any; // TODO
};

export function PostsGridItem({ item }: PostsGridItemPropsType): ReactElement {
  const [jpegValue, jpegLoading, jpegLoadError] = useDownloadURL(
    ref(storage, item.data.thumbnailUrlJpegSmall)
  );

  if (!jpegValue) {
    return <>Hol up</>;
  }

  return (
    <>
      {jpegLoading && jpegValue ? (
        <LoadingSpinner />
      ) : (
        <Image
          key={item.id}
          src={jpegValue}
          alt="test"
          width={100}
          height={100}
        />
      )}
    </>
  );
}
