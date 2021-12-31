import { useChannel, useEvent } from "use-pusher";

const usePusherEventListener = (
  callback,
  event = "",
  dependencies = [],
  channel = "jobify-notifications"
) => {
  const channelObject = useChannel(channel);
  useEvent(
    channelObject,
    event,
    ({ message }) => {
      callback(message);
    },
    dependencies
  );
};

export default usePusherEventListener;
