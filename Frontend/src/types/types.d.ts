export interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface Message {
  id: string;
  text: string;
  sender_id: string;
  receiver_id: string;
  createdAt: string;
  updatedAt: string;
}
