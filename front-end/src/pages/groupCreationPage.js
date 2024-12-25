import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Box, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { blue, grey, teal } from '@mui/material/colors';
import axios from 'axios';
import MenuAppBar from '../components/AppBar';
import BasicButton from '../components/basicButton';
import Cookies from 'js-cookie'

const GroupCreationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const saveGroupIdToCookie = (groupId) => {
    Cookies.set('groupId', JSON.stringify(groupId), { expires: 1 }); 
  };

  const handleClick = async () => {
    try{
      console.log(selectedUsers)
      const response = await axios.post('/api/create-groups', {ids: selectedUsers})  // add a response variable to hold group number
      const groupId = response.data.groupId
      saveGroupIdToCookie(groupId)
    }
    catch(exception){
      console.log(exception)
    }
  }
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
      setSearchTerm(''); 
    }
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u !== user));
  };

  return (
    <div>
      <MenuAppBar title={"🔗 LinkMe."} />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: blue[50], borderRadius: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" sx={{ color: blue[700], mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
            Find Your Friends!
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
              sx={{ mr: 2, borderRadius: '8px', backgroundColor: grey[50] }}
            />

            <BasicButton buttonName = "Create" redirect='eventsPage' onClick={handleClick} />  
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ px: 3, py: 1.5, fontWeight: 'bold', borderRadius: '8px' }}
            >
              Create
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
                    avatar={<Avatar sx={{ backgroundColor: teal[500] }}>{user[0]}</Avatar>}
                    sx={{ backgroundColor: grey[100], color: teal[800], borderRadius: '8px', fontWeight: 'bold' }}
                  />
                ))}
              </Box>
              <Divider sx={{ mb: 2 }} />
            </>
          )}

          <Typography variant="h6" sx={{ color: blue[600], fontWeight: '500', mb: 2 }}>
            Search Results:
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', backgroundColor: grey[50], boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <List>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <ListItem key={index} button onClick={() => handleAddUser(user)} sx={{ mb: 1, borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: teal[500] }}>{user[0]}</Avatar>
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
    </div>
  );
};

export default GroupCreationPage;