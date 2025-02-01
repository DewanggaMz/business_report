import { prismaClient } from "@/lib/database/prismaClient"
import { ResponseError } from "@/lib/error/responseError"
import { successResponse } from "@/lib/response"
// import { response } from "@/lib/utils"
import { BusinessValidation } from "@/lib/validation/business.validation"
import { Validation } from "@/lib/validation/validate"
import { NextResponse } from "next/server"

export class BusinessService {
	static async addBusiness({ reqBody }: { reqBody: any }) {
		reqBody.owners = await Promise.all(
			reqBody.owners.map(async (owner: any) => {
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

			const ownersData = reqBody.owners.map(
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
}
