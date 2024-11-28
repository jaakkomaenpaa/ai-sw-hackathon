import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green from the logo
    },
    secondary: {
      main: '#FFA726', // Orange accent from the logo
    },
    background: {
      default: '#FAFAFA', // Light neutral background for the app
      paper: '#FFFFFF', // Card or container background
    },
    text: {
      primary: '#212121', // Dark gray for high contrast
      secondary: '#757575', // Medium gray for less critical text
    },
    error: {
      main: '#D32F2F', // Red for error states
    },
    warning: {
      main: '#FF9800', // Orange for warnings
    },
    success: {
      main: '#388E3C', // Green for success notifications
    },
    info: {
      main: '#1976D2', // Blue for informational messages
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2E7D32', // Primary green
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#2E7D32',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#212121', // Dark gray
    },
    body1: {
      fontSize: '1rem',
      color: '#212121',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#757575',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Avoid all-caps for better readability
          borderRadius: 8, // Rounded corners for buttons
        },
        containedPrimary: {
          color: '#FFFFFF', // White text for primary buttons
        },
        containedSecondary: {
          color: '#FFFFFF', // White text for secondary buttons
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E7D32', // Primary green for header
          color: '#FFFFFF', // White text
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#FFFFFF', // Paper background for cards
        },
      },
    },
  },
});

export default theme;

