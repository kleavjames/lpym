import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { School } from "../types/school";
import { FC, useCallback, useState } from "react";

type TallyCardProps = {
  ranking: number;
  school: School;
};

const TallyCard: FC<TallyCardProps> = ({ school, ranking }) => {
  const [count, setCount] = useState("1");

  const handleNumberChange = useCallback((value: string) => {
    const result = value.replace(/\D/g, "");

    // handle change here
    setCount(result);
  }, []);

  return (
    <Card>
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        {school.visitors! > 0 && (
          <Typography level="body-md" color="neutral">
            Rank #{ranking + 1}
          </Typography>
        )}
        <Typography level="title-lg" sx={{ color: "primary.700" }}>
          {school.name}
        </Typography>
        <Typography fontSize="xl4" fontWeight="xl" sx={{mb: 1}}>
            {school?.visitors === 0 ? '💁' : school?.visitors}
          </Typography>
        <Stack direction="row" spacing={1}>
          <Button disabled={school.visitors! === 0} color="danger" sx={{ color: "#fff", width: 100 }}>
            Minus
          </Button>
          <Input
            value={count}
            onChange={(e) => handleNumberChange(e.target.value)}
            sx={{ width: 60 }}
          />
          <Button color="primary" sx={{ color: "#fff", width: 100 }}>
            Add
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TallyCard;
