import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "../reviewForm/styles";
import { MyFantasyMovieProps } from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const FantasyMovieForm: React.FC<MyFantasyMovieProps> = (movie) => {
  const defaultValues = {
    defaultValues: {

      title: "",
      genres: [],
      directors: [""],
      plot: "",
      cast: [{ realName: "", fictionName: "" }],
      image_path: "",
    }
  };

  const [open, setOpen] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<MyFantasyMovieProps>(defaultValues);

  const navigate = useNavigate();
  const context = useContext(MoviesContext);
  const { genresList } = useContext(MoviesContext);


  const handleSnackClose = () => {
    setOpen(false);
    navigate("/myfantasymovies");
  };

  const onSubmit: SubmitHandler<MyFantasyMovieProps> = (fantasyMovie) => {
    context.addFantasyMovie(fantasyMovie);
    setOpen(true);

  };

  return (
    <Box component="div" sx={{
      // styles.root
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      paddingTop: 4,
    }}>
      <Typography component="h2" variant="h3">
        Create a Fantasy Movie
      </Typography>

      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <Alert severity="success" variant="filled" onClose={handleSnackClose}>
          <Typography variant="h4">
            Fantasy movie created successfully
          </Typography>
        </Alert>
      </Snackbar>

      <form style={
        // styles.form
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }} onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* TITLE */}
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "60ch" }}
              variant="outlined"
              margin="normal"
              required
              label="Movie Title"
            />
          )}
        />
        {errors.title && (
          <Typography variant="h6" component="p">
            {errors.title.message}
          </Typography>
        )}

        {/* GENRES */}
        <Controller
          name="genres"
          control={control}
          rules={{ required: "Select at least one genre" }}
          defaultValue={[]}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                select
                SelectProps={{ multiple: true }}
                variant="outlined"
                margin="normal"
                label="Genres"
                // fullWidth
                sx={{ width: "60ch" }}

              >
                {genresList.map((g) => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}

        />
        {errors.genres && (
          <Typography variant="h6" component="p">
            {errors.genres.message}
          </Typography>
        )}

        {/* PLOT */}
        <Controller
          name="plot"
          control={control}
          rules={{ required: "Plot is required" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              // fullWidth
              sx={{ width: "60ch" }}

              label="Plot"
              multiline
              minRows={6}
            />
          )}
        />
        {errors.plot && (
          <Typography variant="h6" component="p">
            {errors.plot.message}
          </Typography>
        )}

        {/* DIRECTORS */}
        <Controller
          name="directors"
          control={control}
          rules={{ required: "Directors are required" }}
          defaultValue={[""]}
          render={({ field }) => (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Directors</Typography>
              {field.value.map((director: string, index: number) => (
                <Box key={index}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // fullWidth
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
              <Button
                variant="outlined"
                onClick={() => field.onChange([...field.value, ""])}
              >
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
              {field.value.map((member: any, index: number) => (
                <Box key={index} sx={{ display: "flex", gap: 2, mt: 2, mb: 1 }}>
                  <TextField
                    variant="outlined"
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
                    variant="outlined"
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
              <Button
                variant="outlined"
                onClick={() =>
                  field.onChange([
                    ...field.value,
                    { realName: "", fictionName: "" },
                  ])
                }
              >
                Add Cast Member
              </Button>
            </Box>
          )}
        />

        {/* IMAGE PATH */}
        <Controller
          name="image_path"
          control={control}
          rules={{ required: "Image URL is required" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              // fullWidth
              sx={{ width: "60ch" }}
              label="Image URL"
            />
          )}
        />
        {errors.image_path && (
          <Typography variant="h6" component="p">
            {errors.image_path.message}
          </Typography>
        )}

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
                image_path: "",
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
