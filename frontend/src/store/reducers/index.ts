import { IndexProps, NotificationsReducerProps, UserProps } from "types";

export type ReducersProps = {
  app: IndexProps & {
    notificationVisible: Boolean;
    isGlobalModalOpen: Boolean;
  };
  user: UserProps;
  notifications: NotificationsReducerProps;
};
