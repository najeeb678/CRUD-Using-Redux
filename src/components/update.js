import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUser } from "../Redux/Slices/UserDetails";

const signupSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("Please enter your Name"),
  email: Yup.string().email().required("Please enter your Email"),
  age: Yup.number()
    .required("Age is required and must be a number")
    .min(0)
    .max(100),
  phoneNo: Yup.number().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
});

const initialValues = {
  name: "",
  age: "",
  email: "",
  phoneNo: "",
  gender: "",
};

const Update = () => {
  const { id } = useParams();
  const { users } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    age: "",
    email: "",
    phoneNo: "",
    gender: "",
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, action) => {
      const updatedData = { id, ...values };
      setIsModalOpen(true);
      await dispatch(updateUser(updatedData));
      action.resetForm();

      //navigate("/read");
    },
  });

  useEffect(() => {
    if (id) {
      const singleUser = users.find((user) => user.id === id);
      //const incomingGender = singleUser?.gender || "male";

      // Initialize form values with the existing data
      setValues({
        name: singleUser.name || "",
        age: singleUser.age || "",
        email: singleUser.email || "",
        phoneNo: singleUser.phoneNo || "",
        //gender: incomingGender,
        gender: singleUser.gender,
      });

      setUpdatedData({
        ...singleUser[0],
        //gender: incomingGender,
      });
    }
  }, [id, users, setValues]);

  if (!updatedData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box textAlign="center" margin={3}>
          <Typography variant="h3" style={{ color: "#333" }}>
            Input Form
          </Typography>
        </Box>
        <Grid container spacing={2} style={{ width: "60%", margin: "0 auto" }}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              fullWidth
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />{" "}
            <FormHelperText error>
              {touched.name && errors.name ? errors.name : null}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Age"
              type="number"
              variant="outlined"
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{
                min: 0,
                max: 100,
              }}
              fullWidth
            />
            <FormHelperText error>
              {touched.age && errors.age ? errors.age : null}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />{" "}
            <FormHelperText error>
              {touched.email && errors.email ? errors.email : null}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="PhoneNo"
              variant="outlined"
              name="phoneNo"
              value={values.phoneNo}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />{" "}
            <FormHelperText error>
              {touched.phoneNo && errors.phoneNo ? errors.phoneNo : null}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Gender
              </FormLabel>
              <FormHelperText error>
                {touched.gender && errors.gender ? errors.gender : ""}{" "}
              </FormHelperText>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={values.gender}
              >
                <FormControlLabel
                  name="gender"
                  control={<Radio />}
                  label="Male"
                  onChange={handleChange}
                  value="male"
                />
                <FormControlLabel
                  name="gender"
                  control={<Radio />}
                  label="Female"
                  onChange={handleChange}
                  value="female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Box textAlign="center" margin={3}>
          <Button variant="contained" color="primary" type="submit">
            Add User
          </Button>
        </Box>
      </form>
      <Modal
        open={isModalOpen}
        onClose={!isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 120,
            width: 350,
            bgcolor: "white",
            boxShadow: 10,
            borderRadius: 4,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom margin="auto">
            User Has Been Updated
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              size="small"
              fullWidth
              color="info"
              onClick={() => navigate("/read")}
            >
              Click Here to See Modifications
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Update;

// //update original
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Grid,
//   Radio,
//   RadioGroup,
//   // Paper,
//   // Table,
//   // TableCell,
//   // TableContainer,
//   // TableHead,
//   // TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../Redux/Slices/UserDetails";
// const Update = () => {
//   const [updatedData, setUpdatedData] = useState({
//     name: "",
//     age: 0,
//     email: "",
//     phoneNo: "",
//     gender: "male",
//   });
//   const { id } = useParams(); // Get id from URL params
//   const { users } = useSelector((state) => state.app);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       const singleUser = users.filter((user) => user.id === id);
//       const updatedGender = singleUser[0]?.gender ? "male" : "female";
//       setUpdatedData({
//         ...singleUser[0],
//         gender: updatedGender,
//       });
//     }
//   }, [id, users]);

//   if (!updatedData) {
//     // If updatedData is not defined yet, you can show a loading spinner or handle it differently
//     return <div>Loading...</div>;
//   }

//   const NewData = (e) => {
//     setUpdatedData({
//       ...updatedData,
//       [e.target.name]: e.target.value,
//     });
//     //console.log(updatedData);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser(updatedData));
//     navigate("/read");
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <Box textAlign="center" margin={3}>
//           <Typography variant="h3" style={{ color: "#333" }}>
//             Update Your Form
//           </Typography>
//         </Box>
//         <Grid container spacing={2} style={{ width: "60%", margin: "0 auto" }}>
//           <Grid item xs={12} sm={12}>
//             <TextField
//               label="Name"
//               variant="outlined"
//               name="name"
//               fullWidth
//               value={updatedData.name}
//               onChange={NewData}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <TextField
//               label="Age"
//               type="number"
//               variant="outlined"
//               name="age"
//               value={updatedData.age}
//               inputProps={{
//                 min: 0,
//                 max: 100,
//               }}
//               fullWidth
//               onChange={NewData}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               name="email"
//               value={updatedData.email}
//               fullWidth
//               onChange={NewData}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <TextField
//               label="PhoneNo"
//               variant="outlined"
//               name="phoneNo"
//               value={updatedData.phoneNo}
//               fullWidth
//               onChange={NewData}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <FormControl component="fieldset">
//               <FormLabel
//                 component="legend"
//                 sx={{ fontWeight: "bold", color: "black" }}
//               >
//                 Gender
//               </FormLabel>
//               <RadioGroup row aria-label="gender" name="gender">
//                 <FormControlLabel
//                   name="gender"
//                   value="male"
//                   control={<Radio />}
//                   label="Male"
//                   checked={updatedData.gender === "male"}
//                   onChange={NewData}
//                 />
//                 <FormControlLabel
//                   value="female"
//                   name="gender"
//                   control={<Radio />}
//                   label="Female"
//                   checked={updatedData.gender === "female"}
//                   onChange={NewData}
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Grid>
//         </Grid>
//         <Box textAlign="center" margin={3}>
//           <Button variant="contained" color="success" type="submit">
//             Update
//           </Button>
//         </Box>
//       </form>
//     </>
//   );
// };

// export default Update;
