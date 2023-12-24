import Grid from "@mui/joy/Grid"
import Divider from "@mui/joy/Divider"
import Typography from "@mui/joy/Typography"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import Box from "@mui/joy/Box"

const Results = () => {
  return (
    <>
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
        <Grid xs={12} md={6}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              <Typography level='body-lg'>Overall Visitors</Typography>
              <Box sx={{ fontSize: 50, fontWeight: '800', color: 'primary.700'}}>98</Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ flexGrow: 1, mx: 1 }}
        spacing={2}
      >
        <Grid xs={12} md={6}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              <Typography level='body-lg'>Overall Visitors</Typography>
              <Box sx={{ fontSize: 50, fontWeight: '800', color: 'primary.700'}}>98</Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Results