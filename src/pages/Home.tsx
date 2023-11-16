import React from "react";
import { motion } from "framer-motion";
import { Box, Container } from "@mui/material";
import TodoList from "../components/TodosLIst";
import AddTodos from "../components/AddTodos";

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "#B4CBEE",
        minHeight: "96vh",
        minWidth: "100%",
        padding: "20px",
      }}
    >
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0.5 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      ></motion.h1>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box width="100%" marginBottom={2}>
            <AddTodos />
          </Box>
          <Box width="100%">
            <TodoList />
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Home;
