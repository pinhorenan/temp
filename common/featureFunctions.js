if (typeof geometry === "undefined") {
	geometry = require("./geometry.js");
}
if (typeof draw === "undefined") {
	draw = require("./draw.js");
}

const featureFunctions = {};

// pathCount
featureFunctions.getPathCount = (paths) => {
	return paths.length;
};

// pointCount
featureFunctions.getPointCount = (paths) => {
	const points = paths.flat();
	return points.length;
};

// width
featureFunctions.getWidth = (paths) => {
	const points = paths.flat();
	if (points.length == 0) {
		return 0;
	}
	const x = points.map((p) => p[0]);
	const min = Math.min(...x);
	const max = Math.max(...x);
	return max - min;
};

// height
featureFunctions.getHeight = (paths) => {
	const points = paths.flat();
	if (points.length == 0) {
		return 0;
	}
	const y = points.map((p) => p[1]);
	const min = Math.min(...y);
	const max = Math.max(...y);
	return max - min;
};

// elongation
featureFunctions.getElongation = (paths) => {
	const points = paths.flat();
	const { width, height } = geometry.minimumBoundingBox({ points });
	return (Math.max(width, height) + 1) / (Math.min(width, height) + 1);
};

// roundness
featureFunctions.getRoundness = (paths) => {
	const points = paths.flat();
	const { hull } = geometry.minimumBoundingBox({ points });
	return geometry.roundness(hull);
};

// pixels
featureFunctions.getPixels = (paths, size = 400) => {
	let canvas = null;

	try {
		canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
	} catch (err) {
		//
		const { createCanvas } = require("../node/node_modules/canvas");
		canvas = createCanvas(size, size);
	}

	const ctx = canvas.getContext("2d");

	draw.paths(ctx, paths);

	const imgData = ctx.getImageData(0, 0, size, size);
	return imgData.data.filter((val, index) => index % 4 == 3);
};

// complexity
featureFunctions.getComplexity = (paths) => {
	const pixels = featureFunctions.getPixels(paths);
	return pixels.filter((a) => a != 0).length;
};

featureFunctions.inUse = [
	{ name: "Width", function: featureFunctions.getWidth },
	{ name: "Height", function: featureFunctions.getHeight },
	{ name: "Elongation", function: featureFunctions.getElongation },
	{ name: "Roundness", function: featureFunctions.getRoundness },
	{ name: "Complexity", function: featureFunctions.getComplexity },
];

if (typeof module !== "undefined") {
	module.exports = featureFunctions;
}
