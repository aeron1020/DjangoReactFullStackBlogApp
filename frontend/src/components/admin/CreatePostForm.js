// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   InputLabel,
//   MenuItem,
//   Select,
//   FormControl,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import slugify from "slugify";
// import axiosInstance from "../../Axios";
// import CustomSnackbar from "../CustomSnackBar";

// const CreatePostForm = () => {
//   const theme = useTheme();

//   const [postData, setPostData] = useState({
//     title: "",
//     excerpt: "",
//     slug: "",
//     content: "",
//     status: "draft",
//     head_image: null,
//     category: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [authenticated, setAuthenticated] = useState(false);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     if (token) {
//       setAuthenticated(true);
//     } else {
//       setAuthenticated(false);
//     }

//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get("/categories/");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     if (e.target.name === "title") {
//       const slug = slugify(e.target.value);
//       setPostData({
//         ...postData,
//         [e.target.name]: e.target.value,
//         slug: slug,
//       });
//     } else if (e.target.name === "head_image") {
//       const file = e.target.files[0];
//       setPostData({
//         ...postData,
//         [e.target.name]: file,
//       });

//       // Create a preview of the image
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else if (e.target.name === "category") {
//       // Convert the category ID to an integer
//       const categoryId = e.target.value;
//       setPostData({
//         ...postData,
//         [e.target.name]: categoryId,
//       });
//     } else {
//       setPostData({
//         ...postData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     Object.keys(postData).forEach((key) => {
//       formData.append(key, postData[key]);
//     });

//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await axiosInstance.post("/admin/create/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const newPostData = response.data;

//       // Show Snackbar after action
//       setSnackbarMessage("Post created successfully.");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);

//       setTimeout(() => {
//         window.location.href = `/posts/${newPostData.slug}/`;
//       }, 3000);

//       console.log("Post created successfully");
//     } catch (error) {
//       console.error(
//         "Error creating post:",
//         error.response?.data || error.message
//       );

//       setSnackbarMessage("Error creating post.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!authenticated) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <img
//           src="https://thumbs.dreamstime.com/b/rectangular-sign-board-text-access-denied-white-red-grunge-letters-respectively-white-background-access-denied-107177865.jpg"
//           alt="Access Denied"
//         />
//       </div>
//     );
//   }

//   return (
//     <Container>
//       <CssBaseline />
//       <Grid container justifyContent="center">
//         <Grid item xs={12} md={8} lg={6}>
//           <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               mt: 4,
//               backgroundColor: theme.palette.background.default,
//             }}
//           >
//             <Typography variant="h5" mb={2} color={theme.palette.primary.text}>
//               Create a New Post
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <Box mb={2}>
//                 <InputLabel
//                   htmlFor="head_image"
//                   style={{ color: theme.palette.primary.text }}
//                 >
//                   Upload Image
//                 </InputLabel>
//                 <input
//                   accept="image/*"
//                   type="file"
//                   name="head_image"
//                   id="head_image"
//                   onChange={handleChange}
//                   style={{
//                     display: "block",
//                     marginTop: "8px",
//                     color: theme.palette.primary.text,
//                   }}
//                 />
//               </Box>
//               {imagePreview && (
//                 <Box mb={2}>
//                   <img
//                     src={imagePreview}
//                     alt="Selected post cover preview"
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "300px",
//                       display: "block",
//                       marginBottom: "8px",
//                     }}
//                   />
//                 </Box>
//               )}
//               <Box mb={2}>
//                 <TextField
//                   label="Title"
//                   fullWidth
//                   name="title"
//                   value={postData.title}
//                   onChange={handleChange}
//                   required
//                   InputLabelProps={{
//                     style: { color: theme.palette.primary.text },
//                   }}
//                   InputProps={{ style: { color: theme.palette.primary.text } }}
//                 />
//               </Box>
//               <Box mb={2}>
//                 <TextField
//                   label="Excerpt"
//                   fullWidth
//                   multiline
//                   rows={3}
//                   name="excerpt"
//                   value={postData.excerpt}
//                   onChange={handleChange}
//                   required
//                   InputLabelProps={{
//                     style: { color: theme.palette.primary.text },
//                   }}
//                   InputProps={{ style: { color: theme.palette.primary.text } }}
//                 />
//               </Box>
//               <Box mb={2}>
//                 <TextField
//                   label="Content"
//                   fullWidth
//                   multiline
//                   rows={6}
//                   name="content"
//                   value={postData.content}
//                   onChange={handleChange}
//                   required
//                   InputLabelProps={{
//                     style: { color: theme.palette.primary.text },
//                   }}
//                   InputProps={{ style: { color: theme.palette.primary.text } }}
//                 />
//               </Box>
//               <Box mb={2}>
//                 <TextField
//                   label="Slug"
//                   fullWidth
//                   rows={1}
//                   name="slug"
//                   value={postData.slug}
//                   onChange={handleChange}
//                   required
//                   InputLabelProps={{
//                     style: { color: theme.palette.primary.text },
//                   }}
//                   InputProps={{ style: { color: theme.palette.primary.text } }}
//                 />
//               </Box>
//               <Box mb={2}>
//                 <FormControl fullWidth>
//                   <InputLabel
//                     htmlFor="category"
//                     style={{ color: theme.palette.primary.text }}
//                   >
//                     Category
//                   </InputLabel>
//                   <Select
//                     label="Category"
//                     fullWidth
//                     name="category"
//                     value={postData.category}
//                     onChange={handleChange}
//                     required
//                     sx={{ color: theme.palette.primary.text }}
//                   >
//                     {categories.map((category) => (
//                       <MenuItem key={category.id} value={category.id}>
//                         {category.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Box>
//               <Box mb={2}>
//                 <TextField
//                   select
//                   label="Status"
//                   fullWidth
//                   name="status"
//                   value={postData.status}
//                   onChange={handleChange}
//                   SelectProps={{
//                     native: true,
//                   }}
//                   InputLabelProps={{
//                     style: { color: theme.palette.primary.text },
//                   }}
//                   InputProps={{ style: { color: theme.palette.primary.text } }}
//                 >
//                   <option value="draft">Draft</option>
//                   <option value="published">Published</option>
//                 </TextField>
//               </Box>
//               <Box textAlign="right">
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     backgroundColor: theme.palette.primary.button,
//                     color: "#FFF",
//                   }}
//                 >
//                   {loading ? "Creating..." : "Create Post"}
//                 </Button>
//               </Box>
//             </form>
//           </Paper>
//         </Grid>
//       </Grid>
//       {/* Snackbar component */}
//       <CustomSnackbar
//         open={snackbarOpen}
//         message={snackbarMessage}
//         severity={snackbarSeverity}
//         handleClose={() => setSnackbarOpen(false)}
//         autoHideDuration={5000}
//       />
//     </Container>
//   );
// };

// export default CreatePostForm;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import slugify from "slugify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axiosInstance from "../../Axios";
import CustomSnackbar from "../CustomSnackBar";

const CreatePostForm = () => {
  const theme = useTheme();

  const [postData, setPostData] = useState({
    title: "",
    excerpt: "",
    slug: "",
    content: "",
    status: "draft",
    head_image: null,
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "title") {
      const slug = slugify(e.target.value);
      setPostData({
        ...postData,
        [e.target.name]: e.target.value,
        slug: slug,
      });
    } else if (e.target.name === "head_image") {
      const file = e.target.files[0];
      setPostData({
        ...postData,
        [e.target.name]: file,
      });

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (e.target.name === "category") {
      // Convert the category ID to an integer
      const categoryId = e.target.value;
      setPostData({
        ...postData,
        [e.target.name]: categoryId,
      });
    } else {
      setPostData({
        ...postData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setPostData((prevData) => ({
      ...prevData,
      content: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(postData).forEach((key) => {
      formData.append(key, postData[key]);
    });

    try {
      const token = localStorage.getItem("access_token");
      console.log("JWT Token:", token);

      const response = await axiosInstance.post("/admin/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${token}`,
        },
      });

      console.log("Server Response:", response);

      const newPostData = response.data;

      // Show Snackbar after action
      setSnackbarMessage("Post created successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        window.location.href = `/posts/${newPostData.slug}/`;
      }, 3000);

      console.log("Post created successfully");
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response.data || error.message
      );

      setSnackbarMessage("Error creating post.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="https://thumbs.dreamstime.com/b/rectangular-sign-board-text-access-denied-white-red-grunge-letters-respectively-white-background-access-denied-107177865.jpg"
          alt="Access Denied"
        />
      </div>
    );
  }

  return (
    <Container>
      <CssBaseline />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mt: 4,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Typography variant="h5" mb={2} color={theme.palette.primary.text}>
              Create a New Post
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <InputLabel
                  htmlFor="head_image"
                  style={{ color: theme.palette.primary.text }}
                >
                  Upload Image
                </InputLabel>
                <input
                  accept="image/*"
                  type="file"
                  name="head_image"
                  id="head_image"
                  onChange={handleChange}
                  style={{
                    display: "block",
                    marginTop: "8px",
                    color: theme.palette.primary.text,
                  }}
                />
              </Box>
              {imagePreview && (
                <Box mb={2}>
                  <img
                    src={imagePreview}
                    alt="Selected post cover preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  />
                </Box>
              )}
              <Box mb={2}>
                <TextField
                  label="Title"
                  fullWidth
                  name="title"
                  value={postData.title}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    style: { color: theme.palette.primary.text },
                  }}
                  InputProps={{ style: { color: theme.palette.primary.text } }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Excerpt"
                  fullWidth
                  multiline
                  rows={3}
                  name="excerpt"
                  value={postData.excerpt}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    style: { color: theme.palette.primary.text },
                  }}
                  InputProps={{ style: { color: theme.palette.primary.text } }}
                />
              </Box>
              <Box mb={2}>
                <InputLabel
                  htmlFor="content"
                  style={{ color: theme.palette.primary.text }}
                >
                  Content
                </InputLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data={postData.content}
                  onChange={handleContentChange}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "|",
                      "blockQuote",
                      "insertTable",
                      "mediaEmbed",
                      "imageUpload",
                      "undo",
                      "redo",
                    ],
                    enterMode: "div",
                    mediaEmbed: {
                      previewsInData: true,
                    },
                  }}
                  style={{ color: theme.palette.primary.text }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Slug"
                  fullWidth
                  rows={1}
                  name="slug"
                  value={postData.slug}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    style: { color: theme.palette.primary.text },
                  }}
                  InputProps={{ style: { color: theme.palette.primary.text } }}
                />
              </Box>
              <Box mb={2}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="category"
                    style={{ color: theme.palette.primary.text }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    label="Category"
                    fullWidth
                    name="category"
                    value={postData.category}
                    onChange={handleChange}
                    required
                    sx={{ color: theme.palette.primary.text }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box mb={2}>
                <TextField
                  select
                  label="Status"
                  fullWidth
                  name="status"
                  value={postData.status}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={{
                    style: { color: theme.palette.primary.text },
                  }}
                  InputProps={{ style: { color: theme.palette.primary.text } }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </TextField>
              </Box>
              <Box textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: theme.palette.primary.button,
                    color: "#FFF",
                  }}
                >
                  {loading ? "Creating..." : "Create Post"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      {/* Snackbar component */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setSnackbarOpen(false)}
        autoHideDuration={5000}
      />
    </Container>
  );
};

export default CreatePostForm;
