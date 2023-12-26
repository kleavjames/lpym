import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import { useCallback, useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { AccountRoles } from "../types/accounts";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useAccounts } from "../hooks/useAccounts";
import Alert from "@mui/joy/Alert";

const initAccountPass = {
  name: "",
  username: "",
  password: "",
};

const Accounts = () => {
  const { createAccount } = useAccounts();

  const [userPass, setUserPass] = useState(initAccountPass);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [accRole, setAccRole] = useState(AccountRoles.Staff);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserPass((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (!userPass.username || !userPass.password || !userPass.name) {
      setError("All fields are required");
      return;
    }

    await createAccount({
      name: userPass.name,
      username: userPass.username,
      password: userPass.password,
      role: accRole,
    });
    setShowAlertSuccess(true);

    setTimeout(() => {
      setShowAlertSuccess(false);
    }, 5000);
  }, [accRole, createAccount, userPass]);

  const onReset = useCallback(() => {
    if (error) {
      setError(null);
    }
  }, [error]);

  return (
    <>
      {showAlertSuccess && (
        <Alert
          variant="soft"
          color="success"
          startDecorator={<AccountCircleRoundedIcon />}
          endDecorator={
            <Button
              size="sm"
              variant="solid"
              color="success"
              onClick={() => setShowAlertSuccess(false)}
            >
              Close
            </Button>
          }
        >
          You successfully created an account.
        </Alert>
      )}
      <Grid
        container
        sx={{ flexGrow: 1, m: 1, mt: { xs: 7, md: 0 } }}
        spacing={2}
      >
        <Grid xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography level="h1" sx={{ pb: 1, color: "primary.700" }}>
              Accounts
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
        </Grid>
        <Grid xs={12} sm={8} md={4}>
          <Sheet
            sx={{ width: "100%", p: 3, borderRadius: 10 }}
            variant="outlined"
          >
            <Typography level="body-lg" sx={{ mb: 3 }}>
              Create an account
            </Typography>
            <Stack spacing={1}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={userPass.name}
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                  onFocus={onReset}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={userPass.username}
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                  onFocus={onReset}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  value={userPass.password}
                  type="password"
                  variant="outlined"
                  onChange={handleChange}
                  onFocus={onReset}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  id="select-field-account-label"
                  htmlFor="select-field-account-button"
                >
                  Role
                </FormLabel>
                <Select
                  defaultValue={accRole}
                  slotProps={{
                    button: {
                      id: "select-field-account-button",
                      "aria-labelledby":
                        "select-field-account-label select-field-account-button",
                    },
                  }}
                  onChange={(_e, newValue) => setAccRole(newValue!)}
                >
                  <Option value={AccountRoles.SuperAdmin}>
                    Super Administrator
                  </Option>
                  <Option value={AccountRoles.Admin}>Administrator</Option>
                  <Option value={AccountRoles.Staff}>Staff Member</Option>
                  <Option value={AccountRoles.Guest}>Guest</Option>
                </Select>
              </FormControl>
            </Stack>
            {error && (
              <Typography level="body-sm" sx={{ mt: 3 }} color="danger">
                {error}
              </Typography>
            )}
            <Button type="submit" onClick={handleSubmit} sx={{ mt: 5 }}>
              Create Account
            </Button>
          </Sheet>
        </Grid>
      </Grid>
    </>
  );
};

export default Accounts;
