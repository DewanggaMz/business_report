import { ResponseError } from "@/lib/error/responseError"
// import { response } from "@/lib/utils"
import { BusinessValidation } from "@/lib/validation/business.validation"
import { Validation } from "@/lib/validation/validate"

export class BusinessService {
	static async addBusiness({ reqBody }: { reqBody: any }) {
		return {
			name: "testt",
		}
	}
}
