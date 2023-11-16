import React from "react";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { MdEdit, MdSettingsBackupRestore } from "react-icons/md";
import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";

const TodoItem = (props) => {
  const {
    item,
    updateTodo,
    moveToTrash,
    completeTodo,
    deleteItem,
    restoreItem,
    sort,
  } = props;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.li
        initial={{
          x: "150vw",
          transition: { type: "spring", duration: 2 },
        }}
        animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
        whileHover={{
          scale: 0.9,
          transition: { type: "spring", duration: 0.1 },
        }}
        exit={{
          x: "-60vw",
          scale: [1, 0],
          transition: { duration: 0.5 },
          backgroundColor: "rgba(255,0,0,1)",
        }}
        key={item.id}
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Card style={{ width: "100%", height: "100%" }}>
          <CardContent style={{ backgroundColor: "white" }}>
            <Typography variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {item.description}
            </Typography>
            <Typography variant="body2" component="p">
              Deadline: {item.deadline}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              {sort === "removed" || (
                <IconButton
                  style={{
                    color: "orange",
                  }}
                  onClick={() => {
                    updateTodo({ ...item, isOnEdit: true });
                  }}
                >
                  <MdEdit />
                </IconButton>
              )}
              {sort === "completed" ||
                sort === "overdue" ||
                sort === "removed" || (
                  <IconButton
                    style={{
                      color: "green",
                    }}
                    onClick={() => {
                      completeTodo(item.id);
                    }}
                  >
                    <IoCheckmarkDoneSharp />
                  </IconButton>
                )}
              {sort === "removed" || (
                <IconButton
                  style={{ color: "gray" }}
                  onClick={() => moveToTrash(item)}
                >
                  <FaTrash />
                </IconButton>
              )}
              {sort === "completed" ||
                sort === "overdue" ||
                sort === "active" || (
                  <IconButton
                    style={{ color: "red" }}
                    onClick={() => deleteItem(item.id)}
                  >
                    <IoClose />
                  </IconButton>
                )}
              {sort === "completed" ||
                sort === "overdue" ||
                sort === "active" || (
                  <IconButton
                    style={{ color: "blue" }}
                    onClick={() => restoreItem(item.id)}
                  >
                    <MdSettingsBackupRestore />
                  </IconButton>
                )}
            </div>
          </CardContent>
        </Card>
      </motion.li>
    </Grid>
  );
};

export default TodoItem;
