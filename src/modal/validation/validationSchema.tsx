import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  deadline: Yup.date()
    .nullable()
    .max(new Date(), "Deadline must be today or earlier"),
});
