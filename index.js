const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

let removeActive = (element) => {
	element.forEach((e) => {
		e.classList.remove("active");
	});
};

let updateDashBoard = (type) => {
	let current__time = document.getElementsByClassName("current__time");
	let previous__time = document.getElementsByClassName("previous__time");
	fetch("data.json")
		.then((res) => res.json())
		.then((data) => {
			switch (type) {
				case "weekly":
					for (var key in data) {
						current__time[key].textContent =
							data[key].timeframes.weekly["current"] +
							(data[key].timeframes.weekly["current"] > 1 ||
							data[key].timeframes.weekly["current"] == 0
								? "hrs"
								: "hr");
						previous__time[key].textContent =
							"Previous - " +
							data[key].timeframes.weekly["previous"] +
							(data[key].timeframes.weekly["previous"] > 1 ||
							data[key].timeframes.weekly["previous"] == 0
								? "hrs"
								: "hr");
					}
					break;

				case "monthly":
					for (var key in data) {
						current__time[key].textContent =
							data[key].timeframes.monthly["current"] +
							(data[key].timeframes.monthly["current"] > 1 ||
							data[key].timeframes.monthly["current"] == 0
								? "hrs"
								: "hr");
						previous__time[key].textContent =
							"Previous - " +
							data[key].timeframes.monthly["previous"] +
							(data[key].timeframes.monthly["previous"] > 1 ||
							data[key].timeframes.monthly["previous"] == 0
								? "hrs"
								: "hr");
					}
					break;

				default:
					for (var key in data) {
						current__time[key].textContent =
							data[key].timeframes.daily["current"] +
							(data[key].timeframes.daily["current"] > 1 ||
							data[key].timeframes.daily["current"] == 0
								? "hrs"
								: "hr");
						previous__time[key].textContent =
							"Previous - " +
							data[key].timeframes.daily["previous"] +
							(data[key].timeframes.daily["previous"] > 1 ||
							data[key].timeframes.daily["previous"] == 0
								? "hrs"
								: "hr");
					}
			}
		});
};

// Default data
updateDashBoard("daily");

// Event Listeners for the options
daily.addEventListener("click", function () {
	if (!daily.classList.contains("active")) {
		daily.classList.add("active");
		removeActive([weekly, monthly]);
		updateDashBoard("daily");
	}
});

weekly.addEventListener("click", function () {
	if (!weekly.classList.contains("active")) {
		weekly.classList.add("active");
		removeActive([daily, monthly]);
		updateDashBoard("weekly");
	}
});

monthly.addEventListener("click", function () {
	if (!monthly.classList.contains("active")) {
		monthly.classList.add("active");
		removeActive([weekly, daily]);
		updateDashBoard("monthly");
	}
});
