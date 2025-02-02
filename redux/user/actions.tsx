// "use client"

// import { auth } from "@/auth"
// import { setUser } from "@/redux/user/userSlice"
// import { store } from "@/redux/store"
// import { useSession } from "next-auth/react"

// export const fetchUser = () => {
// 	try {
// 		const state = store.getState()
// 		if (state.user.user) return

// 		const session = useSession()
// 		console.log({ session })
// 		if (session) {
// 			store.dispatch({
// 				type: "user/setUser",
// 				payload: {
// 					name: "testt",
// 					email: "test",
// 				},
// 			})

// 			console.log(store.getState())
// 		}
// 	} catch (error) {
// 		console.error("Gagal mengambil user:", error)
// 	}
// }
