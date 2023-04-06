function createdAt() {
	const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
	const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

	const timestamp = Date.now();
	const date = new Date(timestamp);

	const year = date.getFullYear().toString();
	const month = months[date.getMonth()];
	const day = days[date.getDay()];
	const dateOfMonth = date.getDate().toString();
	const hours = ('0' + date.getHours()).slice(-2);
	const minutes = ('0' + date.getMinutes()).slice(-2);
	const seconds = ('0' + date.getSeconds()).slice(-2);

	const formattedDate = `${day}, ${dateOfMonth} ${month} ${year}`;
	return formattedDate;
}

export default createdAt;