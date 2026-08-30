import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext.tsx";
import { useNavigate } from "react-router-dom";
import styles from "../reviewForm/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface FantasyMovieFormData {
  title: string;
  genres: number[];
  directors: string[];
  plot: string;
  cast: { realName: string; fictionName: string }[];
  imagefile?: FileList;
}

const FantasyMovieForm: React.FC = () => {
  const defaultValues = {
    title: "",
    genres: [],
    directors: [""],
    plot: "",
    cast: [{ realName: "", fictionName: "" }],
    imagefile: undefined,

  };

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FantasyMovieFormData>({ defaultValues });

  const navigate = useNavigate();
  const { genresList, addFantasyMovie } = useContext(MoviesContext);

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/myfantasymovies");
  };

  const onSubmit: SubmitHandler<FantasyMovieFormData> = async (fantasyMovie) => {
    const formData = new FormData();

    formData.append("title", fantasyMovie.title);
    formData.append("plot", fantasyMovie.plot);

    fantasyMovie.genres.forEach((g) => formData.append("genres", g.toString()));
    fantasyMovie.directors.forEach((d) => formData.append("directors", d));

    fantasyMovie.cast.forEach((c, index) => {
      formData.append(`cast[${index}][realName]`, c.realName);
      formData.append(`cast[${index}][fictionName]`, c.fictionName);
    });

    const file = fantasyMovie.imagefile?.[0];
    if (file) formData.append("imagefile", file);

    await addFantasyMovie(formData);
    setOpen(true);
  };

  const selectedFile = watch("imagefile");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: 4 }}>
      <Typography variant="h3">Create a Fantasy Movie</Typography>

      <Snackbar sx={styles.snack} anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} onClose={handleSnackClose}>
        <Alert severity="success" variant="filled" onClose={handleSnackClose}>
          <Typography variant="h4">Fantasy movie created successfully</Typography>
        </Alert>
      </Snackbar>

      <form
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* TITLE */}
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} sx={{ width: "60ch" }} variant="outlined" margin="normal" required label="Movie Title" />
          )}
        />

        {/* GENRES */}
        <Controller
          name="genres"
          control={control}
          rules={{ required: "Select at least one genre" }}
          defaultValue={[]}
          render={({ field }) => (
            <TextField {...field} select SelectProps={{ multiple: true }} sx={{ width: "60ch" }} label="Genres">
              {genresList.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* PLOT */}
        <Controller
          name="plot"
          control={control}
          rules={{ required: "Plot is required" }}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} sx={{ width: "60ch" }} label="Plot" multiline minRows={6} required />
          )}
        />

        {/* DIRECTORS */}
        <Controller
          name="directors"
          control={control}
          defaultValue={[""]}
          render={({ field }) => (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Directors</Typography>
              {field.value.map((director, index) => (
                <Box key={index}>
                  <TextField
                    sx={{ width: "60ch" }}
                    label={`Director ${index + 1}`}
                    value={director}
                    onChange={(e) => {
                      const updated = [...field.value];
                      updated[index] = e.target.value;
                      field.onChange(updated);
                    }}
                  />
                </Box>
              ))}
              <Button variant="outlined" onClick={() => field.onChange([...field.value, ""])}>
                Add Director
              </Button>
            </Box>
          )}
        />

        {/* CAST */}
        <Controller
          name="cast"
          control={control}
          defaultValue={[{ realName: "", fictionName: "" }]}
          render={({ field }) => (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Cast</Typography>
              {field.value.map((member, index) => (
                <Box key={index} sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    sx={{ width: "29ch" }}
                    label="Actor Real Name"
                    value={member.realName}
                    onChange={(e) => {
                      const updated = [...field.value];
                      updated[index].realName = e.target.value;
                      field.onChange(updated);
                    }}
                  />
                  <TextField
                    sx={{ width: "29ch" }}
                    label="Character Name"
                    value={member.fictionName}
                    onChange={(e) => {
                      const updated = [...field.value];
                      updated[index].fictionName = e.target.value;
                      field.onChange(updated);
                    }}
                  />
                </Box>
              ))}
              <Button variant="outlined" onClick={() => field.onChange([...field.value, { realName: "", fictionName: "" }])}>
                Add Cast Member
              </Button>
            </Box>
          )}
        />

        {/* IMAGE UPLOAD */}
        <Controller
          name="imagefile"
          control={control}
          defaultValue={undefined}
          render={({ field }) => (
            <>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="imagefile-input"
                onChange={(e) => {
                  const fileList = e.target.files;
                  field.onChange(fileList);
                  if (fileList?.[0]) {
                    setPreview(URL.createObjectURL(fileList[0]));
                  }
                }}
              />

              <label htmlFor="imagefile-input">
                <Button variant="contained" component="span" sx={{ marginTop: "20px" }}>
                  Upload Image
                </Button>
              </label>
            </>
          )}
        />

        {preview && <img src={preview} alt="Preview" style={{ width: "300px", marginTop: "20px" }} />}

        {/* BUTTONS */}
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" sx={styles.submit}>
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() =>
              reset({
                title: "",
                genres: [],
                directors: [""],
                plot: "",
                cast: [{ realName: "", fictionName: "" }],
                imagefile: undefined,
              })
            }
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FantasyMovieForm;
