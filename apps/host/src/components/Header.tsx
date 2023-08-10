import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

import { useCount } from "host/context";

const styles = {
  appBar: {
    marginBottom: 2,
  },
};

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [count, setCount] = useCount();

  return (
    <AppBar position="static" sx={styles.appBar}>
      <ButtonBase href="/">
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h6">{count}</Typography>
        </Toolbar>
      </ButtonBase>
    </AppBar>
  );
}
