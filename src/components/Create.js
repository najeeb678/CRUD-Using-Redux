import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/Slices/UserDetails";


import CustomModal from "./CustomModal";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
const signupSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("please Enter your Name "),
  email: Yup.string().email().required("Please Enter your Email"),
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
const Create = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        dispatch(addUser(values));

        action.resetForm();
        setIsModalOpen(true);
      },
    });

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            />
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Years</InputAdornment>
                ),
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
            />
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
            />
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
      {isModalOpen && <CustomModal open={isModalOpen} onClose={closeModal} />}
    </>
  );
};

export default Create;

/////without using formik and yup

// import {
//   Box,
//   Button,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Grid,
//   Radio,
//   RadioGroup,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../Redux/Slices/UserDetails";
// import CustomModal from "./CustomModal";

// const Create = () => {
//   const dispatch = useDispatch();
//   //const [gender, setGender] = useState("male"); // Default value is 'male'
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [inputValue, setInputValue] = useState({
//     name: "",
//     age: "",
//     email: "",
//     phoneNo: "",
//     gender: "",
//   }); // Default value is ''

//   // const handleGenderChange = (event) => {
//   //   setGender(event.target.value);
//   // };

//   const inputChangeHandler = (e) => {
//     setInputValue({
//       ...inputValue,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const closeModal = (e) => {
//     setIsModalOpen(false);
//   };
//   const formSubmitHandler = (e) => {
//     e.preventDefault();
//     dispatch(addUser(inputValue));
//     //console.log(inputValue);
//     // navigate("/read");

//     //alert("User Has Been Added");

//     setInputValue({
//       name: "",
//       age: "",
//       email: "",
//       phoneNo: "",
//       gender: "",
//     });

//     setIsModalOpen(true);
//   };

//   return (
//     <>
//       <form onSubmit={formSubmitHandler}>
//         <Box textAlign="center" margin={3}>
//           <Typography variant="h3" style={{ color: "#333" }}>
//             Input Form{" "}
//           </Typography>
//         </Box>
//         <Grid container spacing={2} style={{ width: "60%", margin: "0 auto" }}>
//           <Grid item xs={12} sm={12}>
//             <TextField
//               label="Name"
//               variant="outlined"
//               name="name"
//               value={inputValue.name || ""}
//               fullWidth
//               onChange={inputChangeHandler}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <TextField
//               label="Age"
//               type="number"
//               variant="outlined"
//               name="age"
//               value={inputValue.age || ""}
//               inputProps={{
//                 min: 0,
//                 max: 100,
//               }}
//               fullWidth
//               onChange={inputChangeHandler}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               name="email"
//               value={inputValue.email || ""}
//               fullWidth
//               onChange={inputChangeHandler}
//             />
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <TextField
//               label="PhoneNo"
//               variant="outlined"
//               name="phoneNo"
//               value={inputValue.phoneNo || ""}
//               fullWidth
//               onChange={inputChangeHandler}
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
//               <RadioGroup
//                 row
//                 aria-label="gender"
//                 name="gender"
//                 value={inputValue.gender || ""}
//               >
//                 <FormControlLabel
//                   name="gender"
//                   value="male"
//                   control={<Radio />}
//                   label="Male"
//                   onChange={inputChangeHandler}
//                 />
//                 <FormControlLabel
//                   value="female"
//                   name="gender"
//                   control={<Radio />}
//                   label="Female"
//                   onChange={inputChangeHandler}
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Grid>
//         </Grid>
//         <Box textAlign="center" margin={3}>
//           <Button variant="contained" color="success" type="submit">
//             Add User
//           </Button>
//         </Box>
//       </form>
//       {isModalOpen && <CustomModal open={isModalOpen} onClose={closeModal} />}
//     </>
//   );
// };

// export default Create;
