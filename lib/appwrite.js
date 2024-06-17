
import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.native.aora',
    projectId : '66688524003c2463addc',
    datebaseId: '666886f5003041437df8',
    userCollectionId: '66688729000219ef9062',
    videosCollectionId: '6668875e000520fda18e',
    storageId: '66688cde000b425b9a0c'
} 


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client)

    export const createUser = async(email, password, username) => {
        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username

            )

            if(!newAccount) throw Error;

            const avatarUrl = avatars.getInitials(username)

            await signIn(email,password)

            const newUser = await databases.createDocument(
                appwriteConfig.datebaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl
                }
            )

            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error(error);
            
        }

    }

    export async function signIn(email,password){
        try {
            const session = await account.createEmailSession(email,password)

            return session;
        } catch (error) {
            throw new Error(error)

            
        }
    }

// Register User



;
