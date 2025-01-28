"use client"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"

const Modal = ({
	children,
	isOpen,
	setIsOpen,
}: {
	children: React.ReactNode
	isOpen: boolean
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}

	const modalVariants = {
		hidden: { y: "-7vh", opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 120 },
		},
		exit: { y: "7vh", opacity: 0 },
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed top-0 left-0 h-screen w-screen bg-black/50 z-50 flex justify-center items-center"
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.3 }}
					exit="hidden"
					onClick={() => setIsOpen && setIsOpen(false)}
				>
					<motion.div
						className="bg-card2 p-4 rounded-md shadow-lg max-h-[80vh] overflow-auto custom-scrollbar relative"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Modal
