import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import LPYMLogo from "../assets/lpym.png";

const Maintenance = () => {
  return (
    <Box
      sx={{ height: "100dvh", display: "flex", alignItems: "center", mx: 2 }}
    >
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid xs={12} mdOffset={4} smOffset={2} sm={8} md={4}>
          <Box sx={{ width: "100%", p: 3, borderRadius: 10 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
              <img
                src={LPYMLogo}
                srcSet={LPYMLogo}
                loading="lazy"
                alt="LPYM Logo"
                width={70}
                height={70}
              />
            </Stack>
            <Typography level="title-lg" sx={{ mb: 3 }}>
              We&rsquo;ll be back soon!
            </Typography>
            <Typography level="body-md" sx={{ mb: 3 }}>
              Sorry for the inconvenience but we&rsquo;re performing some
              maintenance at the moment. If you need to, you can always{" "}
              <a href="tel:#">contact us</a>, otherwise we&rsquo;ll be back
              online shortly!
            </Typography>
            <Typography level="body-md" sx={{ mb: 3 }}>
              &mdash; The Team
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Maintenance;
