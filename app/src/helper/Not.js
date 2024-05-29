import * as Notifications from 'expo-notifications';

export async function schedulePushNotification(seconds,TaskTitleValue,NotesValue) {

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${TaskTitleValue}📬`,
        body: `${NotesValue}`,
      },
      trigger: { seconds: seconds },
    });
  }