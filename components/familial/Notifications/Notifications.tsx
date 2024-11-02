import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import ClearIcon from '@mui/icons-material/Clear';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import GlobalContext from '../../../context/GlobalContext';
import { DrillyTypography } from '../../../styles/globals';
import { Notification } from '../../../types';
import { IconButton } from '@mui/material';

type NotificationsProps = {
  notifications?: Notification[];
  setIsNotificationsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[] | undefined>>;
};

export default function Notifications({
  notifications,
  setIsNotificationsSidebarOpen,
  setNotifications,
}: NotificationsProps) {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <>
      <DrillyTypography component='h1' tw='mt-2 text-center' variant='h5' $isDarkMode={isDarkMode}>
        Notifications
      </DrillyTypography>
      <div tw='flex flex-col gap-3 mt-6 md:px-6'>
        {!!notifications?.length ? (
          notifications?.map(
            ({
              _id,
              contentId,
              contentImageUrl,
              contentParentId,
              contentType,
              fromAvatarUrl,
              notification,
              notificationType,
              toId,
            }) => {
              return (
                <Link
                  key={_id}
                  href={
                    contentType === 'recipe'
                      ? `/recipes/${contentId}`
                      : `/photos/${contentParentId}?p=${contentId}`
                  }
                  onClick={async () => {
                    await fetch('/api/notifications/delete', {
                      method: 'PUT',
                      body: JSON.stringify({
                        _id,
                        toId,
                      }),
                    }).then(async res => {
                      const notificationsNew: Notification[] = await res.json();
                      setNotifications(notificationsNew);
                      setIsNotificationsSidebarOpen(false);
                    });
                  }}
                  tw='border-[1px] border-gray-DADADA flex flex-col p-3 rounded-2xl'
                >
                  <div tw='flex justify-between'>
                    <div tw='flex gap-2'>
                      {notificationType === 'like' ? (
                        <ThumbUpIcon color='primary' />
                      ) : notificationType === 'love' ? (
                        <FavoriteIcon color='error' />
                      ) : notificationType === 'smile' ? (
                        <EmojiEmotionsIcon color='warning' />
                      ) : null}
                      <Image
                        alt=''
                        height={0}
                        sizes='100vw'
                        src={fromAvatarUrl}
                        tw='h-6 w-6 rounded-3xl'
                        width={0}
                      />
                    </div>
                    <NotificationClearButton $isDarkMode={isDarkMode}>
                      <ClearIcon
                        onClick={async e => {
                          e.preventDefault();

                          await fetch('/api/notifications/delete', {
                            method: 'PUT',
                            body: JSON.stringify({
                              _id,
                              toId,
                            }),
                          }).then(async res => {
                            const notificationsNew: Notification[] = await res.json();
                            setNotifications(notificationsNew);
                          });
                        }}
                        color='error'
                        tw='cursor-pointer'
                      />
                    </NotificationClearButton>
                  </div>
                  <DrillyTypography variant='subtitle2' $isDarkMode={isDarkMode}>
                    {notification}{' '}
                  </DrillyTypography>
                  <Image
                    alt=''
                    height={0}
                    sizes='100vw'
                    src={contentImageUrl}
                    tw='h-28 object-cover w-16'
                    width={0}
                  />
                </Link>
              );
            },
          )
        ) : (
          <DrillyTypography tw='text-center' $isDarkMode={isDarkMode}>
            You have no notifications
          </DrillyTypography>
        )}
      </div>
    </>
  );
}

export const NotificationClearButton = styled(IconButton)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`hover:bg-gray-900`,
    !$isDarkMode && tw`hover:bg-gray-200`,
  ],
);
