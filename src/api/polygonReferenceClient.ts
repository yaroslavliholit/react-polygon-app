import {referenceClient} from "@polygon.io/client-js";
import ENV from "../app/constants/env";

const polygonReferenceClient =  referenceClient(`${ENV.POLYGON_API_KEY}`);

export default polygonReferenceClient;
