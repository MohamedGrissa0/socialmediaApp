const io = require('socket.io')(9000, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

let users = [];

const addUser = (userId, socketId) => {
    // Check if userId is not null or undefined
    if (userId && !users.some((user) => user.userId === userId)) {
        users.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // Handle sending messages
    socket.on("SendMsg", ({ senderId, receiverId, text }) => {
        console.log(receiverId);
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMsg", {
                senderId,
                text
            });
        } else {
            console.log("User not found");
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log("A user disconnected");
        io.emit("getUsers", users);
    });
});
