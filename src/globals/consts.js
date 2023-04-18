const cutter_list = [
  ["335407", "嘉晚饭T0"],
  ["1546534138", "嘉心糖制片厂"],
  ["17771572", "王减肥_"],
  ["1628088", "金色の闇Official"],
  ["394998430", "肥恐龙523"],
  ["511750000", "很难不suki"],
  ["428891", "千彼Penxill"],
];

const empty_song = {
  name: "--",
  artist: "--",
  status: "--",
  duration: "00:00",
  date: "--",
  id: "empty_song",
  src: "",
};

const cipher = "ASOULForevERIhc0nWsJzCVau4BpYGMtH2XZPld1b6573xNi98wKDyQmkTgjqf";
const code_prefix = "DionysusLink://";

const artist_mapping = [];
// artist_mapping["向晚"] = "A";
// artist_mapping["贝拉"] = "B";
// artist_mapping["珈乐"] = "C";
// artist_mapping["嘉然"] = "D";
// artist_mapping["乃琳"] = "E";
// artist_mapping["A-SOUL"] = "F";
artist_mapping["黎酩Lunette"] = "L";
artist_mapping["塞拉菲娜Serafina"] = "S";

export default {
  cutter_list,
  empty_song,
  cipher,
  code_prefix,
  artist_mapping,
};
