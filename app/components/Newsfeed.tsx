import { faker } from "@faker-js/faker";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

type NewsArticle = {
  title: string;
  description: string;
  author: string;
  //date: string;
  imageUrl: string;
};

const generateNewsData = (count: number): NewsArticle[] => {
  faker.seed(123);
  return Array.from({ length: count }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.person.fullName(),
    //date: faker.date.past().toLocaleDateString(),
    imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 100 }),
  }));
};

export const NewsFeed = () => {
  const newsArticles: NewsArticle[] = generateNewsData(10);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          overflowY: "auto",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          maxHeight: "350px",
          gap: "1rem",
        }}
      >
        {newsArticles.map((article) => (
          <Box key={article.title}>
            <Card>
              <CardActionArea>
                <CardMedia
                  alt={article.title}
                  component="img"
                  height="100"
                  image={article.imageUrl}
                />

                <CardContent>
                  <Typography component="div" gutterBottom variant="h6">
                    {article.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {article.description.substring(0, 100)}...
                  </Typography>
                  <Typography
                    color="text.secondary"
                    display="block"
                    sx={{ marginTop: 1 }}
                    variant="caption"
                  >
                    By {article.author} {/*| {article.date} */}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
