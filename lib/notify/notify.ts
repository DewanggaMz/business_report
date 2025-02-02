import {
	Bounce,
	toast,
	ToastPosition,
	ToastTransitionProps,
} from "react-toastify"

type Options = {
	position: ToastPosition | undefined
	autoClose: number
	hideProgressBar: boolean
	closeOnClick: boolean
	pauseOnHover: boolean
	draggable: boolean
	progress: undefined
	theme: string
	transition: ({
		children,
		position,
		preventExitTransition,
		done,
		nodeRef,
		isIn,
		playToast,
	}: ToastTransitionProps) => React.JSX.Element
}
export const notify = ({
	type,
	message,
	optionsUser = {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
		theme: "light",
		transition: Bounce,
	},
}: {
	type: string
	message: string
	optionsUser?: Options
}) => {
	switch (type) {
		case "success":
			toast.success(message, optionsUser)
			break
		case "error":
			toast.error(message, optionsUser)
			break
		default:
			toast.info(message, optionsUser)
			break
	}
}
