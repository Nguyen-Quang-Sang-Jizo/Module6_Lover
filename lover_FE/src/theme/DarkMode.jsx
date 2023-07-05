import { useColorScheme } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton 
    sx={{marginLeft:"5px"}}
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? <LightModeIcon /> :  <NightlightIcon/>}
    </IconButton>
  );
}

export default ModeToggle;
