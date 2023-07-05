import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Input,
  InputBase,
  Typography,
} from "@mui/material";
import InforButton from "./Button";
import SearchInput from "./Search.jsx";
import { useUserProfile } from "../../../customHook/useUserProfile";

export default function PersonalPage() {
  const profile = useUserProfile();


  return (
    <Box
      sx={{
        display: "block",
        height: "100vh",
        marginTop: "65px",
        flexGrow: 1,
        backgroundColor:"customColorSchemes.bgColorPage"
      }}
    >
      <Container maxWidth="xl" fixed sx={{ height: "100%" }}>
        {profile && (
          <Grid container p={2}>
            <Grid item xs={3} p={2} align="center">
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  padding="5px"
                  component="img"
                  height="340"
                  image={profile.avatar}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" align="center">
                    Lizard
                  </Typography>
                  <Typography gutterBottom variant="h6" align="center">
                    (biet danh)
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    Nam sinh:
                    <br />
                    Song tai:{profile?.address}
                  </Typography>
                </CardContent>
              </Card>

              <InforButton />
            </Grid>
            <Grid item xs={6} p={2}>
              <Box
                bgcolor="customColorSchemes.backgroundColor"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  padding: "15px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Avatar src={profile.avatar} />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Hãy viết gì vào đây"
                />
              </Box>
            </Grid>
            <Grid item xs={3} p={2}>
              <SearchInput />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
