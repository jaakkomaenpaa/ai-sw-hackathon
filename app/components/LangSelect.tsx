import { Box, IconButton } from '@mui/material';
import { useLocale } from '~/stores/LocaleStore';
import { Language } from '~/types';
import flagFI from '../resources/flag-fi.png';
import flagGB from '../resources/flag-gb.png';

export const LangSelect = () => {
  const { changeLanguage } = useLocale();

  const handleSelect = (lang: Language) => {
    changeLanguage(lang);
  };

  return (
    <Box
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        zIndex: 1000,
      }}
    >
      <IconButton onClick={() => handleSelect(Language.English)}>
        <img src={flagGB} alt="English" width={30} height={20} />
      </IconButton>

      {/* Finnish Flag */}
      <IconButton onClick={() => handleSelect(Language.Finnish)}>
        <img src={flagFI} alt="Finnish" width={30} height={20} />
      </IconButton>
    </Box>
  );
};
