import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { SearchableList } from '~/components/SearchList';
import { LineChart } from '~/components/LineChart';
import { Suspense } from 'react';
import { LangSelect } from '~/components/LangSelect';
import { useSelection } from '~/stores/SelectionStore';
import useOpenAI from '~/hooks/useOpenAi';

export function meta() {
  return [
    { title: 'AgriSight' },
    { name: 'description', content: 'Welcome to AgriSight' },
  ];
}


export default function Home() {

  const selection = useSelection()

  const { fetchCompletion, result } = useOpenAI()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: '0.5rem',
      }}
    >
      <LangSelect />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          borderRadius: '5px',
          height: '100vh',
          p: '0.5rem',
          gap: '0.5rem',
          justifyContent: 'space-between',
        }}
      >
        <SearchableList />
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: '0.5rem',
            p: '0.5rem',
            border: '1px solid #cccaca' /* Subtle light gray border */,
          }}
        >
          <Button onClick={
            () => {
              console.log("clicked")
              fetchCompletion({
                prompt: [],
                model: 'gpt-4o-mini'
              }).then(() => console.log(result))
            }}>kysy jotain apilta</Button>
          uutisvirta??
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 3,
          borderRadius: '5px',
          height: '100vh',
          p: '0.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '0 0 1',
            minHeight: '5rem',
          }}
        >
          <Typography variant="h1">AgriSight</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 5,
            backgroundColor: 'background.paper',
            borderRadius: '5px',
            p: '0.5rem',
            border: '1px solid #E0E0E0' /* Subtle light gray border */,
          }}
        >
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress color="success" size="4rem" />
              </Box>
            }
          >
            <LineChart />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}
