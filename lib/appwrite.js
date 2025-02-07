import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.native.aora',
    projectId : '66688524003c2463addc',
    databaseId: '666886f5003041437df8',
    userCollectionId: '66688729000219ef9062',
    videoCollectionId: '6668875e000520fda18e',
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
    // const storage = new Storage(client);

    export const createUser = async(email, password, username) => {
        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username

            )

            if(!newAccount) throw Error;

            const avatarUrl = avatars.getInitials(username);

            await signIn(email,password);

            const newUser = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email:email,
                    username:username,
                    avatar: avatarUrl
                }
            );
            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error(error);   
        }
    }

    export async function signIn(email, password) {
        try {
          const session = await account.createEmailSession(email, password);
          return session;
        } catch (error) {
          throw new Error(error);
        }
      }
// Register User
// export const getCurrentUser = async ()=> {
//     try {
//         const currentAccount = await account.get();

//         if(!currentAccount) throw Error;

//         const currentUser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal('accountId',currentAccount.$id)]
//         );
//         if(!currentUser) throw Error;
//         return currentUser.documents[0];
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }

// To get the account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

//get currently logged in user
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

//sign out the user
  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

//Get all post   
export const getAllPosts = async () => {
  try{
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      
    )
    return posts.documents
  }catch(error){
    throw new Error(error)
  }
}

//Get latest videos
export const getLatestPosts = async () => {
  try{
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    )
    return posts.documents
  }catch(error){
    throw new Error(error)
  }
}

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getUserPosts = async (userId) => {
  try{
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      // [Query.equal("creator"), userId]
      [Query.equal("creator", userId)]
    )
    return posts.documents
  }catch(error){
    throw new Error(error)
  }
}
