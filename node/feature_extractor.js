import {
	JSON_DIR,
	SAMPLES,
	FEATURES,
	FEATURES_JS,
} from "../common/constants.js";
import { getPathCount, getPointCount } from "../common/features.js";
import { readFileSync, writeFileSync } from "fs";

const samples = JSON.parse(readFileSync(SAMPLES));

console.log("Extracting features...");

for (const sample of samples) {
	const paths = JSON.parse(readFileSync(JSON_DIR + "/" + sample.id + ".json"));
	sample.point = [getPathCount(paths), getPointCount(paths)];
}

const featureNames = ["Path Count", "Point Count"];

writeFileSync(
	FEATURES,
	JSON.stringify({
		featureNames,
		samples: samples.map((s) => {
			return { point: s.point, label: s.label };
		}),
	}),
);

writeFileSync(
	FEATURES_JS,
	"export const features = " + JSON.stringify({ featureNames, samples }) + ";",
);

console.log("Features extracted and saved to " + FEATURES);
