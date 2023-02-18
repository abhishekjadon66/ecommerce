import React from 'react'
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
const Allproducts = () => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>Hello</FullLayout>
    </ThemeProvider>
  );
}

export default Allproducts