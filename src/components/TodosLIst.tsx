import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodos,
  deleteTask,
  removeTask,
  restoreTasks,
  EditTask,
  selectOverdueTaskList,
  selectRemovedTasks,
  selectTaskList,
  updateTodos,
} from "../redux/slice/todoSlice";
import TodoItem from "./TodoItem";
import TodoModal from "../modal/TodoModal";
import { ITask } from "../types/todos";

const TodoList = () => {
  const [sort, setSort] = useState("active");
  const [openIsModal, setOpenIsModal] = useState(false);
  const [initialValues, setInitialValues] = useState<ITask>();
  const dispatch = useDispatch();
  const taskList = useSelector(selectTaskList);
  const overdueTaskList = useSelector(selectOverdueTaskList);
  const removedTasks = useSelector(selectRemovedTasks);

  const moveToTrash = (item: ITask) => {
    dispatch(removeTask(item));
  };

  const updateTodo = (item: ITask) => {
    const updatedList = dispatch(updateTodos(item));
    setOpenIsModal(item.isOnEdit);
    setInitialValues(updatedList.payload);
  };

  const completeTodo = (id: string) => {
    dispatch(completeTodos(id));
  };

  const deleteItem = (id: string) => {
    dispatch(deleteTask(id));
  };
  const restoreItem = (id: string) => {
    dispatch(restoreTasks(id));
  };

  const handleSubmit = (values: ITask) => {
    dispatch(EditTask({ ...values }));
    setOpenIsModal(false);
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="contained"
              color={sort === "active" ? "success" : "secondary"}
              onClick={() => setSort("active")}
            >
              Active
            </Button>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="contained"
              color={sort === "completed" ? "success" : "secondary"}
              onClick={() => setSort("completed")}
            >
              Completed
            </Button>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="contained"
              color={sort === "overdue" ? "success" : "secondary"}
              onClick={() => setSort("overdue")}
            >
              Overdue
            </Button>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="contained"
              color={sort === "removed" ? "success" : "secondary"}
              onClick={() => setSort("removed")}
            >
              Trash
            </Button>
          </motion.div>
        </Grid>
      </Grid>
      <ul
        style={{
          width: "100%",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <AnimatePresence>
          {/* for active items */}
          {sort === "active"
            ? taskList.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      moveToTrash={moveToTrash}
                      updateTodo={updateTodo}
                      completeTodo={completeTodo}
                      sort={sort}
                    />
                  )
                );
              })
            : null}
          {/* for completed items */}
          {sort === "completed"
            ? taskList.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      moveToTrash={moveToTrash}
                      updateTodo={updateTodo}
                      sort={sort}
                    />
                  )
                );
              })
            : null}
          {/* for overdue items */}
          {sort === "overdue"
            ? overdueTaskList.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    moveToTrash={moveToTrash}
                    updateTodo={updateTodo}
                    sort={sort}
                  />
                );
              })
            : null}
          {/* for removed items */}
          {sort === "removed"
            ? removedTasks.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    moveToTrash={moveToTrash}
                    deleteItem={deleteItem}
                    restoreItem={restoreItem}
                    sort={sort}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
      {initialValues && (
        <TodoModal
          initialValues={initialValues}
          isOpen={openIsModal}
          title={"Edit Task"}
          setOpenIsModal={setOpenIsModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default TodoList;
