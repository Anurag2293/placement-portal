// 'use client'

// import { useState } from "react"
// import { logIn, logOut, toggleModerator } from "@/redux/features/auth-slice"
// import { useDispatch } from "react-redux"
// import { AppDispatch, useAppSelector } from "@/redux/store"

// export default function LogIn() {
//     const [username, setUsername] = useState('')

//     const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated)
//     const dispatch = useDispatch<AppDispatch>()

//     const onClickLogin = () => {
//         dispatch(logIn(username))
//     }

//     const onClickLogout = () => {
//         dispatch(logOut())
//     }

//     const onClickToggle = () => {
//         dispatch(toggleModerator())
//     }

//     return (
//         <div>
//             <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
//             <br />
//             <button onClick={onClickLogin}>Log In</button>
//             <br />
//             <button onClick={onClickLogout}>Log Out</button>
//             <br />
//             {isAuthenticated && <button onClick={onClickToggle}>Toggle Moderator Status</button>}
//         </div>
//     )
// }