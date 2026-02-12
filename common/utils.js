const utils = {};

utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220];
utils.flaggedSamples = [
	1938, 1966, 1855, 1801, 1610, 1611, 1609, 1579, 1423, 1361, 1362, 1363, 1364,
	1365, 1367, 1366, 1315, 1033, 893, 890, 881, 801, 802, 803, 804, 805, 705,
	683, 657, 658, 659, 660, 661, 643, 433, 434, 435, 436, 437, 438, 439, 440,
	379, 381, 354, 339, 463, 1211, 1295, 1296, 1333, 1587, 1937, 1969, 2020, 2019,
	2018, 2022, 2031, 2040, 2281, 2258, 2301, 2563, 2603, 2650, 2652, 2653, 2655,
	2651, 2679, 2699, 2723, 2794, 2791, 2792, 2965, 3200, 3225, 3378, 3377, 3381,
	3379, 3380, 3382, 3383, 3384, 3403, 3425, 3426, 3427, 3428, 3429, 3430, 3422,
	3441, 3537, 3538, 3539, 3540, 3541, 3542, 3543, 3544, 3593, 3690, 3692, 3691,
	3689, 3694, 3695, 3693, 3704, 3703, 3702, 3701, 3700, 3699, 3697, 3698, 3817,
	3824, 3878, 3912, 3995, 4004, 4005, 4008, 4007, 4006, 4010, 4009, 4043, 4211,
	4403, 4411, 4409, 4432, 4440, 4448, 4475, 4611, 4613, 4614, 4615, 4609, 4610,
	4672, 4701, 4702, 4703, 4800, 4835, 4865, 4866, 4867, 4868, 4869, 4870, 4871,
	4872, 4880, 4879, 4878, 4877, 4876, 4875, 4874, 4873, 4913, 4930, 4929, 4931,
	4932, 4933, 4934, 4935, 4936, 4956, 4955, 4954, 4953, 4957, 4958, 4959, 4960,
	4950, 4967, 4968, 5008, 5011, 5016, 5032, 5056, 5034, 5112, 5200, 5207, 5220,
	5222, 5223, 5225, 5249, 5250, 5254, 5255, 5256, 5264, 5263, 5262, 5261, 5260,
	5259, 5258, 5257, 5365, 5364, 5361, 5366, 5367, 5368, 5363, 5384, 5392, 5391,
	5390, 5389, 5388, 5386, 5385, 5400, 5411, 5415, 5414, 5413, 5412, 5410, 5409,
	5416, 5417, 5428, 5429, 5431, 5430, 5432, 5511, 5510, 5540, 5541, 5542, 5543,
	5589, 5590, 5591, 5586, 5587, 5585, 5592, 5588, 5596, 5628, 5627, 5629, 5647,
	5678, 5688, 5696, 5577, 69, 79, 78, 103, 121, 217, 223, 296, 305, 366, 385,
	525, 561, 565, 564, 562, 566, 568, 567, 563, 640, 648, 768, 936, 1144, 1232,
	1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1308, 1332, 1331, 1408, 1481,
	1482, 1484, 1485, 1483, 1486, 1487, 1488, 1800, 1832, 1848, 1872, 1920, 1913,
	1952, 2072, 2160, 2136, 2320, 2544, 2664, 2696, 2760, 2759, 2776, 2800, 2822,
];

utils.styles = {
	car: { color: "gray", text: "🚗" },
	fish: { color: "red", text: "🐠" },
	house: { color: "yellow", text: "🏠" },
	tree: { color: "green", text: "🌳" },
	bicycle: { color: "cyan", text: "🚲" },
	guitar: { color: "blue", text: "🎸" },
	pencil: { color: "magenta", text: "✏️" },
	clock: { color: "lightgray", text: "🕒" },
};
utils.styles["?"] = { color: "red", text: "❓" };

utils.formatPercent = (n) => {
	return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	const percent = utils.formatPercent(count / max);
	process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (objArray, key) => {
	const groups = {};
	for (let obj of objArray) {
		const val = obj[key];
		if (groups[val] == null) {
			groups[val] = [];
		}
		groups[val].push(obj);
	}
	return groups;
};

utils.distance = (p1, p2) => {
	return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
};

utils.getNearest = (loc, points, k = 1) => {
	const obj = points.map((val, ind) => {
		return { ind, val };
	});
	const sorted = obj.sort((a, b) => {
		return utils.distance(loc, a.val) - utils.distance(loc, b.val);
	});
	const indices = sorted.map((obj) => obj.ind);
	return indices.slice(0, k);
};

utils.invLerp = (a, b, v) => {
	return (v - a) / (b - a);
};

utils.normalizePoints = (points, minMax) => {
	let min, max;
	const dimensions = points[0].length;
	if (minMax) {
		min = minMax.min;
		max = minMax.max;
	} else {
		min = [...points[0]];
		max = [...points[0]];
		for (let i = 1; i < points.length; i++) {
			for (let j = 0; j < dimensions; j++) {
				min[j] = Math.min(min[j], points[i][j]);
				max[j] = Math.max(max[j], points[i][j]);
			}
		}
	}
	for (let i = 0; i < points.length; i++) {
		for (let j = 0; j < dimensions; j++) {
			points[i][j] = utils.invLerp(min[j], max[j], points[i][j]);
		}
	}
	return { min, max };
};

utils.toCSV = (headers, samples) => {
	let str = headers.join(",") + "\n";
	for (const sample of samples) {
		str += sample.join(",") + "\n";
	}
	return str;
};

if (typeof module !== "undefined") {
	module.exports = utils;
}
