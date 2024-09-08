import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function FooterBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#0053a5',
          top: 'auto',
          bottom: 0,
          height: '50px', // Set the height of the footer
        }}
      >
        <Toolbar
          sx={{
            height: '100%', // Ensure Toolbar takes up the full height of AppBar
            minHeight: 0, // Remove default minimum height
            padding: 0, // Remove default padding
            display: 'flex', // Ensure the Toolbar uses flexbox
            alignItems: 'center', // Center items vertically
            justifyContent: 'right', // Center items horizontally if needed
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold', // Apply bold text
            }}
          >
            &copy; {new Date().getFullYear()} LinkMe.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
