export const features = {};

export const getPathCount = (paths) => {
	return paths.length;
};

export const getPointCount = (paths) => {
	const points = paths.flat();
	return points.length;
};
