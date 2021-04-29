import { Box, Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import useCheckSessionToken from "../Components/CustomizedHooks/useCheckiSessionToken";
import useCheckRole from "../Components/CustomizedHooks/useCheckRole";

interface UserDetail {
  username: string; 
  email: string;
  role: string
}

const Dashboard = () => {
  const classes = useClasses()
  useCheckSessionToken({failJumpTo: '/welcome'})
  const {isAdmin, data, loading} = useCheckRole()

  const userList =  useCallback(
    () => {
      if(isAdmin) {
        return (
          <>
          {data.map((user: UserDetail) => {
            return <Card key={user.email} className={classes.cardWrapper}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Username: {user.username}
              </Typography>
              <Typography variant="h5" component="h2">
                Email: {user.email}
              </Typography>
              <Typography  color="textSecondary">
                Role: {user.role === 'ADMIN' ? 'Admin' : 'Reader'}
              </Typography>
            </CardContent>
          </Card>
          })}
          </>
        )
      }
      return null
    },
    [data],
  )

  return (
    <Box textAlign='center'>
      <Typography variant="h4">Dashboard</Typography>
      {loading && <Typography>Loading ...</Typography>}
      <Box textAlign="center">
        <Typography>You role is {isAdmin ? 'Admin' : 'Reader'}</Typography>
        <Typography>If you are a reader you cannot see the user list</Typography>
      </Box>
      {userList()}
    </Box>
  );
};

export default Dashboard;

const useClasses = makeStyles({
  wrapper: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  inputWrapper: {
    margin: 20,
  },
  errorMsg: {
    color: "red",
  },
  cardWrapper: {
    minWidth: 300, 
    margin: 5, 
  }
});
