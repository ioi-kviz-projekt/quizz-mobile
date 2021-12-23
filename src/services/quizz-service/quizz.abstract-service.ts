import { HttpService } from "../http";
import { environment } from "../../environment";

export class QuizzAbstractService extends HttpService {
    constructor() {
        super(environment.quizzServiceUrl, {
            logging: {
                requests: {
                    url: true,
                },
                response: {
                    summary: true,
                    body: true,
                },
            },
        });
    }
}
