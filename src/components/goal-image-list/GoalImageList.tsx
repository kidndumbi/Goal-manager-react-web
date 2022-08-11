import UploadButton from "@rpldy/upload-button";
import Uploady, { useItemFinishListener } from "@rpldy/uploady";
import { PropsWithChildren, useState } from "react";
import { useDispatch } from "react-redux";
import { GoalModel } from "../../models/GoalModel.interface";
import { goalsActions } from "../../store/goals";
import { ImageViewModal } from "../image-view/ImageView.Modal";
import classes from "./GoalImageList.module.scss";

const MyUplaodButton = ({
  goalId,
  onImageSaved,
}: PropsWithChildren<{
  goalId: string | undefined;
  onImageSaved?: (data: any) => void;
}>) => {
  const dispatch = useDispatch();

  useItemFinishListener((item) => {
    console.log(
      `item ${item.id} finished uploading, response was: `,
      item.uploadResponse,
      item.uploadStatus
    );

    dispatch(
      goalsActions.addImageData({
        id: goalId,
        imageData: item.uploadResponse.data,
        successCallback() {
          onImageSaved && onImageSaved(item.uploadResponse.data);
        },
      })
    );
  });

  return <UploadButton className="ms-2 btn btn-primary" text="Upload Image" />;
};

type GoalImageListProps = {
  goal: GoalModel;
};

const GoalImageList = ({ goal }: PropsWithChildren<GoalImageListProps>) => {
  const dispatch = useDispatch();

  const [images, setImages] = useState(goal.images || []);
  const [showViewImageModal, setViewImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    public_id: "";
  } | null>(null);

  return (
    <>
      <Uploady
        destination={{
          url:
            process.env.REACT_APP_GOALS_DOMAIN +
            "/media/upload?bucket=goalManagerImages",
        }}
      >
        <MyUplaodButton
          goalId={goal?.id}
          onImageSaved={(image) => {
            setImages((oldImagesArray) => [...oldImagesArray, image]);
          }}
        ></MyUplaodButton>
      </Uploady>
      {images && images.length > 0 && (
        <div className="mt-2">
          {images.map((image) => {
            return (
              <div
                className={`${classes.thumbnail} me-1 rounded`}
                key={image.asset_id}
                style={{
                  backgroundImage: `url(${image.url})`,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedImage(image);
                  setViewImageModal(true);
                }}
              ></div>
            );
          })}
        </div>
      )}
      {showViewImageModal && (
        <ImageViewModal
          showModal={showViewImageModal}
          onCloseModal={() => {
            setViewImageModal(false);
          }}
          onDelete={() => {
            setViewImageModal(false);

            dispatch(
              goalsActions.deleteImage({
                id: goal?.id,
                publicId: selectedImage?.public_id,
                successCallback() {
                  setImages(
                    images.filter((img) => {
                      return img.public_id !== selectedImage?.public_id;
                    })
                  );
                },
              })
            );
          }}
        >
          <a
            href={selectedImage?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="cool"
              className="img-fluid"
              src={selectedImage?.url}
            ></img>
          </a>
        </ImageViewModal>
      )}
    </>
  );
};

export { GoalImageList };