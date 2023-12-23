import Grid from "@mui/joy/Grid"
import Divider from "@mui/joy/Divider"
import Typography from "@mui/joy/Typography"

const Results = () => {
  return (
    <Grid
      container
      sx={{ flexGrow: 1, m: 1, mt: { xs: 7, md: 0 } }}
      spacing={2}
    >
      <Grid xs={12}>
        <Typography level="h1" sx={{ pb: 1, color: "primary.700" }}>
          Results
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  )
}

export default Results