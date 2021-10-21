import React, {useContext, useState, useEffect} from 'react'
import { auth, db } from '../firebase'
import { setDoc, doc, updateDoc, getDoc, getDocs, collection } from '@firebase/firestore'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [user, setuser] = useState()

    const [userFriends, setuserFriends] = useState([])
   
    
    
function signup(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
}

function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
}

function logout(){
    return auth.signOut()
}

function resetpassword(email){
    return auth.sendPasswordResetEmail(email)
}

function updateemail(email){
    return currentUser.updateEmail(email)
}

function updatepassword(password){
    return currentUser.updatePassword(password)
}   

function addUserToCollection(fname, lname, profilepic){
    const usersRef = doc(db, "users", currentUser.uid)
    const docRef = setDoc(usersRef, {
        email: currentUser.email, 
        firstname: fname, 
        lastname: lname,
        profilepicture: profilepic,
        datecreated: new Date()
        })
        console.log(docRef.id)
    
    return docRef
}

function updateFirstName(firstname){
    const userDoc = doc(db, "users", currentUser.uid)
    return updateDoc(userDoc, {firstname:firstname})
}

function updateLastName(lastname){
    const userDoc = doc(db, "users", currentUser.uid)
    return updateDoc(userDoc, {lastname:lastname})
}

function updateProfilePic(profilepicture){
    const userDoc = doc(db, "users", currentUser.uid)
    return updateDoc(userDoc, {profilepicture:profilepicture})
}

function getDocument(){
    const getusers = async () => {
      const docRef = doc(db, "users", currentUser.uid)
      const docSnap = await getDoc(docRef)
      setuser(docSnap.data())
    }
    if(currentUser){
    getusers()
    }
    
}

function getUserDocumentFriends(){
    const getuserfriend = async () => {
    const docRef = collection(db, `users/${currentUser.uid}/friends`)
    const docSnap = await getDocs(docRef)

    setuserFriends(docSnap.docs.forEach((doc) =>({...doc.data(), id: doc.id})))
    
    //console.log(docSnap.docs.forEach((doc)=>{console.log(doc.data(), doc.id)}))
        
    }
   
        getuserfriend()
    
}

useEffect(()=>{
const unsubscribe = auth.onAuthStateChanged(user =>{
    setCurrentUser(user)
    setLoading(false)
})
return unsubscribe
}, [])

    const value={
        currentUser,
        signup,
        login,
        logout,
        resetpassword,
        updateemail,
        updatepassword,
        addUserToCollection,
        updateFirstName,
        updateLastName,
        updateProfilePic,
        user,
        getDocument,
        getUserDocumentFriends,
        userFriends
       
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
