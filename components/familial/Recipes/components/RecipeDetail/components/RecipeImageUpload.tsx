import React from 'react';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import GlobalContext from '../../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../../context/GlobalReducer';
import PhotoUploader from '../../../../../common/PhotoUploader';

type RecipeImageProps = {
  shouldShowImageUpload: boolean;
};

const RecipeImageUpload = ({ shouldShowImageUpload }: RecipeImageProps) => {
  const {
    dispatch,
    state: { photoList },
  } = React.useContext(GlobalContext);
  return (
    shouldShowImageUpload &&
    (!!photoList?.length ? (
      <div tw='flex flex-col'>
        <Image
          alt={photoList ? photoList[0].dataURL ?? '' : ''}
          height={0}
          loading='lazy'
          sizes='100vw'
          src={photoList ? photoList[0].dataURL ?? '' : ''}
          tw='h-40 w-full object-contain ml-8'
          width={0}
        />
        <ClearIcon
          onClick={() =>
            dispatch({
              type: GlobalReducerActionEnum.SET_PHOTO_LIST,
              payload: { photoList: [] },
            })
          }
          color='error'
          tw='absolute cursor-pointer'
        />
      </div>
    ) : (
      <PhotoUploader isMultiple={false} />
    ))
  );
};

export default RecipeImageUpload;
