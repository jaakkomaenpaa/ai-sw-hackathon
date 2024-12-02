import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { SearchableList } from '~/components/SearchList';
import { LineChart } from '~/components/LineChart';
import { Suspense } from 'react';
import { LangSelect } from '~/components/LangSelect';
import { NewsFeed } from '~/components/Newsfeed';
import { LOCALE } from '~/locale';
import { useLocale } from '~/stores/LocaleStore';
import useOpenAI from '~/hooks/useOpenAi';
import { useDataSets, useUpdateDataSets } from '~/stores/DataStore';
import { parseDataForLineChart } from '~/utils';
import { useUpdateAIData } from '~/stores/AIDataStore';

export function meta() {
  return [
    { title: 'AgriSight' },
    { name: 'description', content: 'Welcome to AgriSight' },
  ];
}

export default function Home() {

  const { language } = useLocale();

  const { fetchCompletion, result, loading, error } = useOpenAI()

  const dataSets = useDataSets();
  const setDataSets = useUpdateDataSets();

  const updateAIData = useUpdateAIData();

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
          <NewsFeed />
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
          <LangSelect />
        </Box>

        <Box id="toolbar" sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '3rem',
          backgroundColor: 'background.paper',
        }} >
          <Button onClick={
            () => {
              console.log('making predictions');
              fetchCompletion({
                prompt: dataSets,
                model: "gpt-4o-mini"
              }).then(async () => {
                const parsed = await JSON.parse(result ?? "")
                console.log("ai response  ", parsed)
                const temp = parseDataForLineChart(parsed)
                updateAIData(temp)
              })
            }
          } variant="contained">
            {loading ? <CircularProgress color="success" size="1rem" /> : LOCALE[language].makePredictions}
          </Button>
          {error ? <Typography color="error" variant="body1">{error}</Typography> : null}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 5,
            backgroundColor: 'background.paper',
            p: '0.5rem',
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
    </Box >
  );
}
