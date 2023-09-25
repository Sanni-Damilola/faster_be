export interface ResponseMessage {
  message: string;
  success: boolean;
  data: [] | null;
}

export interface RequestBody {
  username: string;
}
