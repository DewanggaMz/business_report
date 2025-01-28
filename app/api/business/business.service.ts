import { BusinessValidation } from "@/lib/validation/business.validation"
import { Validation } from "@/lib/validation/validate"

export class BusinessService {
	static async addBusiness({ reqBody }: { reqBody: any }) {
		try {
			const validateFields = Validation.validate(
				BusinessValidation.ADDBUSINESS,
				reqBody
			)
		} catch (error) {
			console.log(error)
		}
	}
}
