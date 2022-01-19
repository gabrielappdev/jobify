import { useChannel, useEvent } from "use-pusher";

const usePusherEventListener = (
  callback,
  event = "",
  channel = "jobify-notifications"
) => {
  const channelObject = useChannel(channel);
  useEvent(channelObject, event, ({ message }) => {
    callback(message);
  });
};

export default usePusherEventListener;
