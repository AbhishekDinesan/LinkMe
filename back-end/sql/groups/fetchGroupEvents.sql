SELECT e.start_time, e.end_time
    FROM events e
    JOIN user_group ug ON e.user_id = ug.user_id
    WHERE ug.group_id = $1;