import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { validationSchema } from "./validation/validationSchema";

const TodoModal = ({
  initialValues,
  handleSubmit,
  title,
  isOpen,
  setOpenIsModal,
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit || (() => {}),
    validationSchema: validationSchema || undefined,
    title: title || "Tasks",
  });

  useEffect(() => {
    // Reset formik values when initialValues change
    formik.resetForm({ values: initialValues });
  }, [initialValues]);

  const handleClose = () => {
    setOpenIsModal(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            variant="outlined"
            margin="normal"
            fullWidth
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            label="Description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            variant="outlined"
            margin="normal"
            fullWidth
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            label="Deadline"
            type="date"
            name="deadline"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deadline}
            variant="outlined"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            error={formik.touched.deadline && Boolean(formik.errors.deadline)}
            helperText={formik.touched.deadline && formik.errors.deadline}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoModal;
