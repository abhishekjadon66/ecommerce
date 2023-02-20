import React, { useState } from "react";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
const Add = () => {
  const [form, setForm] = useState({});
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault()
    // Fetch API Request to addd a product
    

  }
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title=" Add a product">
              <Stack spacing={3}>
                <TextField onChange={onChange}
                  value={form.title ?form.title : ""}
                  name="title"
                  label="Title"
                  variant="outlined"
                />
                <TextField onChange={onChange}
                  value={form.type ? form.type : ""}
                  name="type"
                  label="Type"
                  variant="outlined"
                />
                <TextField onChange={onChange}
                  value={form.size ? form.size : ""}
                  name="size"
                  label="Size"
                  variant="outlined"
                />
                <TextField onChange={onChange}
                  value={form.color ? form.color : ""}
                  name="color"
                  label="Color"
                  variant="outlined"
                />
                <TextField onChange={onChange}
                  value={form.slug ? form.slug : ""}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                />

                <TextField onChange={onChange}
                  value={form.description ? form.description : ""}
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                />
              </Stack>
              <br />
              <Button onClick={submitForm} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>

          <Grid item xs={12} lg={12}></Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;
