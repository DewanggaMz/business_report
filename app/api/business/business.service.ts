import { prismaClient } from "@/lib/database/prismaClient"
import { ResponseError } from "@/lib/error/responseError"
import { successResponse } from "@/lib/response"
import { NextResponse } from "next/server"

type Owners = { owner: string; initialCapital: string }
type ReqBodyAdd = {
	name: string
	address: string
	description: string
	creatorId: string
	owners: Owners[]
}

export class BusinessService {
	static async addBusiness({ reqBody }: { reqBody: ReqBodyAdd }) {
		const transformedOwners = await Promise.all(
			reqBody.owners.map(async (owner: Owners) => {
				const ownerID = await prismaClient.user.findUnique({
					where: { email: owner.owner },
					select: { id: true },
				})

				if (!ownerID) {
					throw new ResponseError(
						400,
						`Owner with email ${owner.owner} not found`
					)
				}

				return {
					ownerId: ownerID.id,
					initialCapital: owner.initialCapital,
				}
			})
		)

		const business = await prismaClient.$transaction(async (prisma) => {
			const newBusiness = await prisma.business.create({
				data: {
					name: reqBody.name,
					address: reqBody.address,
					description: reqBody.description,
					creatorId: reqBody.creatorId,
				},
				select: {
					id: true,
				},
			})

			const ownersData = transformedOwners.map(
				(owner: { ownerId: string; initialCapital: string }) => ({
					businessId: newBusiness.id,
					userId: owner.ownerId,
					initialCapital: isNaN(Number(owner.initialCapital))
						? 0
						: Number(owner.initialCapital),
				})
			)

			await prisma.businessOwners.createMany({
				data: ownersData,
			})

			return newBusiness
		})

		return NextResponse.json(
			successResponse(business, "Business added successfully")
		)
	}

	static async getBusinesses({ params }) {
		const reqUserId = params.get("id")
		console.log({ reqUserId })

		if (!reqUserId) {
			throw new ResponseError(400, "User ID is required")
		}

		const businessDb = await prismaClient.businessOwner.findMany({
			where: {
				userId: reqUserId,
			},
			select: {
				business: {
					select: {
						id: true,
						name: true,
						address: true,
						description: true,
						owners: {
							select: {
								id: true,
							},
						},
					},
				},
			},
		})

		const business = businessDb.map((b) => b.business)

		return NextResponse.json(
			successResponse(business, "Businesses fetched successfully")
		)
	}
}
