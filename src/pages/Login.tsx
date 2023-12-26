import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import LPYMLogo from "../assets/lpym.png";
import { useState } from "react";
import bcrypt from 'bcryptjs'


// const salt = bcrypt.genSaltSync(10);
// const hashPassword = bcrypt.hashSync('password', salt);
// store hash in your password DB.

const Login = () => {
  const [userPass, setUserPass] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPass((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    // const isCorrect = bcrypt.compareSync(userPass.password, "$2a$10$fZAc9jssySRTta0a8lHWBedDVy0w9zh54ncjXwnZh1LGsByVCRYay");
  }

  return (
    <Box
      sx={{ height: "100dvh", display: "flex", alignItems: "center", mx: 2 }}
    >
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid xs={12} mdOffset={4} smOffset={2} sm={8} md={4}>
          <Sheet
            sx={{ width: "100%", p: 3, borderRadius: 10 }}
            variant="outlined"
          >
            <Stack alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
              <img
                src={LPYMLogo}
                srcSet={LPYMLogo}
                loading="lazy"
                alt="LPYM Logo"
                width={70}
                height={70}
              />
              <Typography level="title-lg">
                Love Philippines Youth Movement
              </Typography>
            </Stack>
            <Typography level="title-lg" sx={{ mb: 3 }}>
              Login to account
            </Typography>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={userPass.username}
                type="text"
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ mt: 1 }}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={userPass.password}
                type="password"
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" onClick={handleSubmit} fullWidth sx={{ mt: 5 }}>
              Login
            </Button>
          </Sheet>
          <Box component="footer" sx={{ pt: 1 }}>
            <Typography level="body-xs" textAlign="center">
              © Love Philippines Youth Movement {new Date().getFullYear()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
