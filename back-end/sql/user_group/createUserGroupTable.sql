CREATE TABLE IF NOT EXISTS user_group (
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  group_id INT REFERENCES group_table(group_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, group_id)
);