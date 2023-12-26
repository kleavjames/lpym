import Sheet from "@mui/joy/Sheet/Sheet";
import Table from "@mui/joy/Table";
import { School } from "../types/school";
import { FC } from "react";
import Typography from "@mui/joy/Typography";

type SchoolTableProps = {
  schools: School[];
  category: "Elementary" | "High School" | "College" | "Communities";
};

const SchoolTable: FC<SchoolTableProps> = ({
  schools,
  category = "Elementary",
}) => {
  return (
    <Sheet variant="outlined" sx={{ width: "100%", borderRadius: "sm" }}>
      <Table
        size="lg"
        sx={{ "& tr > *:not(:first-of-type)": { textAlign: "right" } }}
      >
        <thead>
          <tr>
            <th style={{ width: "60%" }}>{category}</th>
            <th>Visitors</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.uid}>
              <td>{school.name}</td>
              <td>{school.visitors}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {schools.length === 0 && (
        <Typography sx={{ textAlign: "center", py: 2 }}>
          No data to display
        </Typography>
      )}
    </Sheet>
  );
};

export default SchoolTable;
