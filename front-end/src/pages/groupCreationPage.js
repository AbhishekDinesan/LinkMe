import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Box, Chip } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { blue, grey } from '@mui/material/colors';
import axios from 'axios';

const GroupCreationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/fetch-users', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setAllUsers(response.data);  // Set all users here
      } catch (exception) {
        console.error(exception);
      }
    };

    fetchUsers();
  }, []);

  // Filtered users should start as the full list, then be filtered as search term changes
  const filteredUsers = allUsers
    ? allUsers.filter(user =>
        user && user.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedUsers.includes(user)
      )
    : [];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddUser = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
      setSearchTerm(''); // Clear search input after adding a user
    }
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u !== user));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: blue[50], borderRadius: 3 }}>
        <Typography variant="h4" sx={{ color: blue[700], mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          Create a Group
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: <SearchIcon sx={{ color: blue[500] }} />,
            }}
            sx={{ mr: 2, borderRadius: '4px' }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ px: 3, py: 1.2, fontWeight: 'bold', borderRadius: '8px' }}
          >
            Create Group
          </Button>
        </Box>

        {selectedUsers.length > 0 && (
          <>
            <Typography variant="h6" sx={{ color: blue[600], mb: 2, fontWeight: '500' }}>
              Selected Users:
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedUsers.map((user, index) => (
                <Chip
                  key={index}
                  label={user}
                  onDelete={() => handleRemoveUser(user)}
                  avatar={<Avatar sx={{ backgroundColor: blue[500] }}>{user[0]}</Avatar>}
                  sx={{ backgroundColor: blue[100], color: blue[800], borderRadius: '4px', fontWeight: 'bold' }}
                />
              ))}
            </Box>
            <Divider sx={{ mb: 2 }} />
          </>
        )}

        <Typography variant="h6" sx={{ color: blue[600], fontWeight: '500', mb: 2 }}>
          Search Results:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', backgroundColor: grey[50] }}>
          <List>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <ListItem key={index} button onClick={() => handleAddUser(user)} sx={{ mb: 1, borderRadius: '8px' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: blue[500] }}>{user[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user} />
                  <Button variant="outlined" color="primary" sx={{ ml: 2, borderRadius: '8px', fontWeight: 'bold' }}>
                    Add
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography sx={{ textAlign: 'center', color: grey[600] }}>
                {searchTerm === '' ? 'No users available.' : 'No users found.'}
              </Typography>
            )}
          </List>
        </Paper>
      </Paper>
    </Container>
  );
};

export default GroupCreationPage;
