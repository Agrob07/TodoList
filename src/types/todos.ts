export interface ITask {
  id: string;
  title: string;
  deadline: Date | string;
  description: string;
  completed: boolean;
  isOnEdit: boolean;
}
