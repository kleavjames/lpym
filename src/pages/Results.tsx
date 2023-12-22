import { Box, Divider } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";
import { School, TotalSchools } from "../types/school";

type Props = {
  visitorsCount: TotalSchools;
  elementary: School[];
  juniorHighs: School[];
  seniorHighs: School[];
  colleges: School[];
  communities: School[];
};

const Results: FC<Props> = ({
  visitorsCount: {
    totalVisitors,
    totalCollege,
    totalCommunity,
    totalElementary,
    totalJuniorHigh,
    totalSeniorHigh,
  },
  juniorHighs,
  elementary,
  seniorHighs,
  colleges,
  communities,
}) => {
  const top3Elementary = useMemo(() => {
    if (totalElementary) {
      return elementary.slice(0, 3);
    }
    return [];
  }, [elementary, totalElementary]);

  const top3JuniorHighs = useMemo(() => {
    if (totalJuniorHigh) {
      return juniorHighs.slice(0, 3);
    }
    return [];
  }, [juniorHighs, totalJuniorHigh]);

  const top3SeniorHighs = useMemo(() => {
    if (totalSeniorHigh) {
      return seniorHighs.slice(0, 3);
    }
    return [];
  }, [seniorHighs, totalSeniorHigh]);

  const top3Colleges = useMemo(() => {
    if (totalCollege) {
      return colleges.slice(0, 3);
    }
    return [];
  }, [colleges, totalCollege]);

  const top3Communities = useMemo(() => {
    if (totalCommunity) {
      return communities.slice(0, 3);
    }
    return [];
  }, [communities, totalCommunity]);

  return (
    <>
      <Stack spacing={3} sx={{ pb: 10 }}>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Overall Visitors</Typography>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {totalVisitors}
            </Typography>
          </Stack>
        </Box>
        <Stack spacing={1}>
          <Typography color="primary" fontWeight="bold">
            Total Visitors By Category
          </Typography>
          <Divider />
          {totalElementary !== 0 && (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">Elementary</Typography>
                <Typography variant="h5">{totalElementary}</Typography>
              </Stack>
              <Divider />
            </>
          )}
          {totalJuniorHigh !== 0 && (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">Junior High</Typography>
                <Typography variant="h5">{totalJuniorHigh}</Typography>
              </Stack>
              <Divider />
            </>
          )}
          {totalSeniorHigh !== 0 && (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">Senior High</Typography>
                <Typography variant="h5">{totalSeniorHigh}</Typography>
              </Stack>
              <Divider />
            </>
          )}
          {totalCollege !== 0 && (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">College</Typography>
                <Typography variant="h5">{totalCollege}</Typography>
              </Stack>
              <Divider />
            </>
          )}
          {totalCommunity !== 0 && (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">Community</Typography>
                <Typography variant="h5">{totalCommunity}</Typography>
              </Stack>
              <Divider />
            </>
          )}
        </Stack>
        {totalElementary !== 0 && (
          <Stack spacing={1}>
            <Typography color="primary" fontWeight="bold">
              Top 3 - Elementary Level
            </Typography>
            <Divider />
            {top3Elementary.map((elem, i) => (
              <Box key={elem.uid}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ pb: 1 }}
                >
                  <Typography variant="h5">{i + 1}. {elem.name}</Typography>
                  <Typography variant="h5">{elem.visitors}</Typography>
                </Stack>
                <Divider />
              </Box>
            ))}
          </Stack>
        )}
        {totalJuniorHigh !== 0 && (
          <Stack spacing={1}>
            <Typography color="primary" fontWeight="bold">
              Top 3 - Junior High Level
            </Typography>
            <Divider />
            {top3JuniorHighs.map((junior, i) => (
              <Box key={junior.uid}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ pb: 1 }}
                >
                  <Typography variant="h5">{i + 1}. {junior.name}</Typography>
                  <Typography variant="h5">{junior.visitors}</Typography>
                </Stack>
                <Divider />
              </Box>
            ))}
          </Stack>
        )}
        {totalSeniorHigh !== 0 && (
          <Stack spacing={1}>
            <Typography color="primary" fontWeight="bold">
              Top 3 - Senior High Level
            </Typography>
            <Divider />
            {top3SeniorHighs.map((senior, i) => (
              <Box key={senior.uid}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ pb: 1 }}
                >
                  <Typography variant="h5">{i + 1}. {senior.name}</Typography>
                  <Typography variant="h5">{senior.visitors}</Typography>
                </Stack>
                <Divider />
              </Box>
            ))}
          </Stack>
        )}
        {totalCollege !== 0 && (
          <Stack spacing={1}>
            <Typography color="primary" fontWeight="bold">
              Top 3 - College Level
            </Typography>
            <Divider />
            {top3Colleges.map((college, i) => (
              <Box key={college.uid}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ pb: 1 }}
                >
                  <Typography variant="h5">{i + 1}. {college.name}</Typography>
                  <Typography variant="h5">{college.visitors}</Typography>
                </Stack>
                <Divider />
              </Box>
            ))}
          </Stack>
        )}
        {totalCommunity !== 0 && (
          <Stack spacing={1}>
            <Typography color="primary" fontWeight="bold">
              Top 3 - Companies / Community
            </Typography>
            <Divider />
            {top3Communities.map((communities, i) => (
              <Box key={communities.uid}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ pb: 1 }}
                >
                  <Typography variant="h5">{i + 1}. {communities.name}</Typography>
                  <Typography variant="h5">{communities.visitors}</Typography>
                </Stack>
                <Divider />
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default Results;
