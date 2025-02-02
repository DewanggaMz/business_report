import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "@/redux/user/userSlice"

const persistConfig = {
	key: "user",
	storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer.reducer)

export const store = configureStore({
	reducer: {
		user: persistedReducer,
	},
	middleware: (defaultMiddleware) =>
		defaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store, null, () => {
	console.log("Rehydration selesai!")
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
