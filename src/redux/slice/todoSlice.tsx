import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { ITask } from "../../types/todos";

export interface TodosState {
  taskList: ITask[];
  overdueTaskList: ITask[];
  removedTasks: ITask[];
}

const initialState: TodosState = {
  taskList: [],
  overdueTaskList: [],
  removedTasks: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      state.taskList = [...state.taskList, action.payload];
      return state;
    },
    updateTodos: (state, action) => {
      state.taskList = state.taskList.map((task) => {
        return task.id === action.payload.id
          ? {
              ...task,
              ...action.payload,
            }
          : task;
      });
    },
    EditTask: (state, action) => {
      state.taskList = state.taskList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action) => {
      state.removedTasks = state.removedTasks.filter(
        (task) => task.id !== action.payload
      );
    },
    completeTodos: (state, action) => {
      state.taskList = state.taskList.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
    overdueTasks: (state, action) => {
      state.overdueTaskList = [...state.overdueTaskList, action.payload];
    },
    checkDeadline: (state, action) => {
      const currentDate = new Date();
      const propDate = new Date(action.payload.deadline);
      const differenceInTime = currentDate.getTime() - propDate.getTime();
      const differenceInDays = Math.floor(
        differenceInTime / (1000 * 3600 * 24)
      );

      if (differenceInDays > 2) {
        state.overdueTaskList = [...state.overdueTaskList, action.payload];
      } else {
        state.taskList = [...state.taskList, action.payload];
      }
    },
    removeTask: (state, action) => {
      const removedTask = action.payload;

      state.taskList = state.taskList.filter(
        (task) => task.id !== removedTask.id
      );

      state.overdueTaskList = state.overdueTaskList.filter(
        (task) => task.id !== removedTask.id
      );

      state.removedTasks = [...state.removedTasks, removedTask];
    },
    restoreTasks: (state, action) => {
      const restoredTask = state.removedTasks.find(
        (task) => task.id === action.payload
      );

      if (restoredTask) {
        state.taskList.push(restoredTask);

        state.removedTasks = state.removedTasks.filter(
          (task) => task.id !== action.payload
        );
      }
    },
  },
});

export const {
  addNewTask,
  EditTask,
  deleteTask,
  completeTodos,
  updateTodos,
  overdueTasks,
  checkDeadline,
  removeTask,
  restoreTasks,
} = todoSlice.actions;

export const selectTaskList = (state: RootState) => state.todo.taskList;
export const selectOverdueTaskList = (state: RootState) =>
  state.todo.overdueTaskList;
export const selectRemovedTasks = (state: RootState) => state.todo.removedTasks;

export default todoSlice.reducer;
