import React, { useState } from "react";
import { motion } from "framer-motion";
import TodoModal from "../modal/TodoModal";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { checkDeadline } from "../redux/slice/todoSlice";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
  const dispatch = useDispatch();
  const [openIsModal, setOpenIsModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleCLick = () => {
    setOpenIsModal(true);
  };

  const handleSubmit = (values) => {
    const id = uuidv4();
    dispatch(
      checkDeadline({ ...values, id, completed: false, isOnEdit: false })
    );
    setOpenIsModal(false);

    setInitialValues({
      title: "",
      description: "",
      deadline: "",
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
        initialValues={initialValues}
      />
    </motion.div>
  );
};

export default Todos;
