export interface SpendRecord {
  id: string;
  trip_id: string;
  category: string;
  amount: number;
  payment: string;
  memo?: string;
  created_at: string;
  user_id: string;
}
