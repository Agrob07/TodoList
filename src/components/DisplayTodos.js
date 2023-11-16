import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodos,
  deleteTask,
  removeTask,
  restoreTasks,
  saveEditedTask,
  selectOverdueTaskList,
  selectRemovedTasks,
  selectTaskList,
  updateTodos,
} from "../redux/slice/todoSlice";
import TodoItem from "./TodoItem";
import TodoModal from "../modal/TodoModal";

const DisplayTodos = () => {
  const [sort, setSort] = useState("active");
  const [openIsModal, setOpenIsModal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const dispatch = useDispatch();
  const taskList = useSelector(selectTaskList);
  const overdueTaskList = useSelector(selectOverdueTaskList);
  const removedTasks = useSelector(selectRemovedTasks);

  const moveToTrash = (item) => {
    dispatch(removeTask(item));
  };

  const updateTodo = (obj) => {
    const updatedList = dispatch(updateTodos(obj));
    setOpenIsModal(obj.isOnEdit);
    setInitialValues(updatedList.payload);
  };

  const completeTodo = (id) => {
    dispatch(completeTodos(id));
  };

  const deleteItem = (id) => {
    dispatch(deleteTask(id));
  };
  const restoreItem = (id) => {
    dispatch(restoreTasks(id));
  };

  const handleSubmit = (values) => {
    console.log(values, "formval");
    dispatch(saveEditedTask({ ...values }));
    setOpenIsModal(false);
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="contained"
              color="success"
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
              color="success"
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
              color="success"
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
              color="success"
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

export default DisplayTodos;
