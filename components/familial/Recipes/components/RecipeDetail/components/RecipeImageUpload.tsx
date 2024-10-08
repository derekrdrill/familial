import React from 'react';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import GlobalContext from '../../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../../context/GlobalReducer';
import PhotoUploader from '../../../../../common/PhotoUploader';

type RecipeImageProps = {
  recipeImageUrl?: string;
  shouldShowImageUpload: boolean;
};

const RecipeImageUpload = ({ recipeImageUrl, shouldShowImageUpload }: RecipeImageProps) => {
  const {
    dispatch,
    state: { photoList },
  } = React.useContext(GlobalContext);
  return (
    shouldShowImageUpload &&
    (!!photoList?.length || recipeImageUrl ? (
      <div tw='flex flex-col'>
        <Image
          alt=''
          height={0}
          loading='lazy'
          sizes='100vw'
          src={(!!photoList?.length ? photoList[0].dataURL : recipeImageUrl) ?? ''}
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
