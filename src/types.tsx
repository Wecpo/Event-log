export type Event = {
  id: number;
  date: string;
  important: string;
  hardware: string;
  message: string;
  responsible: string;
  isRead: boolean;
  avatarSRC: string;
};

export type EventFromAddForm = {
  important: string;
  hardware: string;
  message: string;
  responsible: string;
  avatarSRC: string;
};
