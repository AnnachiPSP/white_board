const users = [];

// Adding a user
const addUser = ({userName, roomName, roomId, host, socketId}) => {
    const user = {userName, roomName, roomId, host, socketId};
    users.push(user);
    return users.filter((user) => user.roomId == roomId);
};

//Removing a user
const removeUser = (socketId) => {
    const i = users.findIndex(user => user.socketId == socketId);
    if(i != -1){
        return users.splice(i, 1)[0];
    }
};

//Getting a user
const getUser = (socketId) => {
    return users.find((user) => user.socketId == socketId);
};

//Getting all the users from the room
const getUsersInRoom = (roomId) => {
    return users.filter((user) => user.roomId == roomId);
};

const allUser = () => {
    return users;
}

export {
    addUser, removeUser, getUser, getUsersInRoom, allUser
};