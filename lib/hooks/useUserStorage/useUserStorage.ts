import {signInProps, UserInfo, User} from "@/lib/hooks/useUserStorage/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {v4 as uuidv4} from 'uuid';


const useUserStorage = () => {
    const signUp = async (
        {
            name,
            email,
            password,
            phone,
            avatarUri,
        }: UserInfo) => {
        try {
            const allUsers = await AsyncStorage.getItem("users")
            const users: User[] = allUsers
                ? JSON.parse(allUsers)
                : []
            const existingUser = users?.find(user => user.email === email)
            if (existingUser) {
                Alert.alert("User already exists")
                throw new Error("User already exists")
            }
            const newUser: User = {
                id: uuidv4(),
                name,
                email,
                password,
                phone,
                avatarUri
            }
            const usersUpdated = [...users, newUser]
            await AsyncStorage.setItem("users", JSON.stringify(usersUpdated));
            await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));
            return newUser;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const signIn = async (
        {
            email,
            password,
        }: signInProps
    ) => {
        try {
            const allUsers = await AsyncStorage.getItem("users")
            const users: User[] = allUsers
                ? JSON.parse(allUsers)
                : []
            const user = users?.find(user => user.email === email && user.password === password)

            if (!user) {
                Alert.alert("User not found")
                throw new Error("User not found")
            }
            await AsyncStorage.setItem("currentUser", JSON.stringify(user));
            return user;

        } catch (error) {
            console.log(error)
        }
    }

    const signOut = async () => {
        await AsyncStorage.removeItem("currentUser");
    };

    const updatedUser = async (updatedData: Partial<User>) => {
        try {
            const currentUserData = await AsyncStorage.getItem("currentUser")
            if (!currentUserData) {
                throw new Error("No user logged in")
            }
            const currentUser: User = JSON.parse(currentUserData)
            const allUsers = await AsyncStorage.getItem("users")
            const users: User[] = allUsers
                ? JSON.parse(allUsers)
                : []
            const updatedUser: User = {...currentUser, ...updatedData}

            const updatedUsers = users.map((user) => user.id === currentUser.id ? updatedUser : user)
            await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
            await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

            return updatedUser;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const getCurrentUser = async () => {
        const userData = await AsyncStorage.getItem("currentUser");
        return userData
            ? JSON.parse(userData)
            : null;
    }

    return {
        signUp,
        signIn,
        updatedUser,
        signOut,
        getCurrentUser,
    };
}
export default useUserStorage;
