import React, { useState } from "react";
import { motion } from "framer-motion";
import TodoModal from "../modal/TodoModal";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { checkDeadline } from "../redux/slice/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { ITask } from "../types/todos";

const AddTodos = () => {
  const dispatch = useDispatch();
  const [openIsModal, setOpenIsModal] = useState(false);
  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    description: "",
    deadline: "",
    completed: false,
    isOnEdit: false,
  });

  const handleCLick = () => {
    setOpenIsModal(true);
  };

  const handleSubmit = (values: ITask) => {
    const id = uuidv4();
    dispatch(
      checkDeadline({ ...values, id, completed: false, isOnEdit: false })
    );
    setOpenIsModal(false);
    setFormValues({
      id: "",
      title: "",
      description: "",
      deadline: "",
      completed: false,
      isOnEdit: false,
    });
  };

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button variant="contained" color="primary" onClick={handleCLick}>
        Add task
      </Button>
      <TodoModal
        isOpen={openIsModal}
        setOpenIsModal={setOpenIsModal}
        title={"Add Tasks"}
        handleSubmit={handleSubmit}
        initialValues={formValues}
      />
    </motion.div>
  );
};

export default AddTodos;
