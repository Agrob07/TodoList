import React from "react";
import DisplayTodos from "../components/DisplayTodos";
import Todos from "../components/Todos";
import { motion } from "framer-motion";
import { Box, Container } from "@mui/material";

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "#B4CBEE",
        minHeight: "100vh",
        minWidth: "100vw",
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
            <Todos />
          </Box>
          <Box width="100%">
            <DisplayTodos />
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Home;
