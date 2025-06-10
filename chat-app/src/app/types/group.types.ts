export interface Group {
  id: number;
  name: string;
  membersIds: number[];
  creatorId: number | null;
  creatorName: string;
  creatorEmail: string;
}