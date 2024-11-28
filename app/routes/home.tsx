import { Box, Button } from "@mui/material";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "AgriSight" },
    { name: "description", content: "Welcome to AgriSight" },
  ];
}

export default function Home() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      Tervetuloo
      <Button variant="contained">ksajfal</Button>
    </Box>
  )
}
