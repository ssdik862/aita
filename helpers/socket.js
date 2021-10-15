// models
import UserService from "../services/UserService.js";

const socket = io => {
    io.on('connection', (socket) => {
        console.log('New Connection');
    
        setInterval(async () => {
            const users = await UserService.getArrivedUsers();
            io.emit('usersMap', users)
        }, 5000);

        setInterval(async () => {
            const user = await UserService.getBoardingUser();
            io.emit('userBoarding', user)
        }, 4000);
    
    });
};

export default socket;