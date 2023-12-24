import Grid from "@mui/joy/Grid"
import Divider from "@mui/joy/Divider"
import Typography from "@mui/joy/Typography"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import Box from "@mui/joy/Box"
import SchoolTable from "../components/SchoolTable"

const Results = () => {
  return (
    <Box sx={{mb: 2}}>
      {/* Total visitors */}
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
              <Typography level='body-lg'>TOTAL VISITORS</Typography>
              <Box sx={{ fontSize: 50, fontWeight: '800', color: 'primary.700'}}>98</Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Total visitors by category */}
      <Grid
        container
        sx={{ flexGrow: 1, mx: 1, mt: 2 }}
        spacing={2}
      >
        <Grid xs={12}>
          <Typography>Total visitors by category</Typography>
          <Divider />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              <Typography level='body-lg'>ELEMENTARY</Typography>
              <Box sx={{ fontSize: 50, fontWeight: '800', color: 'primary.700'}}>15</Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              <Typography level='body-lg'>HIGH SCHOOL</Typography>
              <Box sx={{ fontSize: 50, fontWeight: '800', color: 'primary.700'}}>24</Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              <Typography level='body-lg'>COLLEGE</Typography>
              <Box sx={{ fontSize: 50, fontWeight: '800', color: 'primary.700'}}>5</Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              <Typography level='body-lg'>COMMUNITIES</Typography>
              <Box sx={{ fontSize: 50, fontWeight: '800', color: 'primary.700'}}>3</Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Top 3 schools per category */}
      <Grid
        container
        sx={{ flexGrow: 1, mx: 1, mt: 2 }}
        spacing={2}
      >
        <Grid xs={12}>
          <Typography>Top 3 schools / communities by category</Typography>
          <Divider />
        </Grid>
        <Grid xs={12} md={6}>
          <SchoolTable />
        </Grid>
        <Grid xs={12} md={6}>
          <SchoolTable />
        </Grid>
        <Grid xs={12} md={6}>
          <SchoolTable />
        </Grid>
        <Grid xs={12} md={6}>
          <SchoolTable />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Results