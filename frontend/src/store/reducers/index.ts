import { IndexProps, NotificationsReducerProps, UserProps } from "types";

export type ReducersProps = {
  app: IndexProps & {
    notificationVisible: boolean;
    isGlobalModalOpen: boolean;
  };
  user: UserProps;
  notifications: NotificationsReducerProps;
};
