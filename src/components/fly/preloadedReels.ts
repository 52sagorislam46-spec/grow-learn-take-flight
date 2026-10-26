import type { Post } from "./types";

/**
 * In-app preloaded reels: shown in the Reels feed alongside real Firebase reels
 * so the feed is never empty and costs no Firestore reads/writes.
 * Ids start with "pre_" — likes/comments/shares on these stay local only.
 */
export const PRELOADED_PREFIX = "pre_";
export const isPreloadedReel = (id: string) => id.startsWith(PRELOADED_PREFIX);

const CREATORS = [
  { id: "rafi", name: "রাফি আহমেদ", user: "rafi.vibes", img: 12 },
  { id: "nusrat", name: "নুসরাত জাহান", user: "nusrat_daily", img: 47 },
  { id: "tanvir", name: "Tanvir Hasan", user: "tanvir.travels", img: 15 },
  { id: "mim", name: "মিম আক্তার", user: "mim.life", img: 44 },
  { id: "arif", name: "Arif Khan", user: "arif_motivation", img: 33 },
  { id: "sadia", name: "সাদিয়া ইসলাম", user: "sadia.art", img: 49 },
  { id: "jisan", name: "Jisan Rahman", user: "jisan.tech", img: 59 },
  { id: "priya", name: "প্রিয়া দাস", user: "priya_moments", img: 45 },
];

const CAPTIONS: [string, string[]][] = [
  ["প্রকৃতির এই সৌন্দর্য মন ভালো করে দেয় 🌿", ["nature", "bangla", "reels"]],
  ["আজকের দিনটা একদম অন্যরকম ছিল ✨", ["lifestyle", "viral", "fyp"]],
  ["কখনো হাল ছেড়ো না, সফলতা আসবেই 💪", ["motivation", "bangla"]],
  ["ঘুরতে যাওয়ার সেরা জায়গা 😍", ["travel", "reels", "viral"]],
  ["এই মুহূর্তটা ভুলবো না কখনো ❤️", ["moments", "fyp"]],
  ["শান্তির খোঁজে একটু বেরিয়ে পড়া 🚶", ["travel", "nature"]],
  ["ভিডিওটা শেষ পর্যন্ত দেখো 🔥", ["viral", "trending", "fyp"]],
  ["Weekend vibes only 🎶", ["vibes", "reels"]],
];

const VIDEO_IDS = [
  34487, 4883, 1171, 39767, 42294, 4813, 1164, 3248, 2244, 34404, 44347, 41576,
  47583, 50846, 4007, 39894, 42925, 43028, 1610, 2098, 4697, 18294, 23345,
];

const HOUR = 3600_000;
const BASE = Date.UTC(2026, 9, 25);

export const PRELOADED_REELS: Post[] = VIDEO_IDS.map((vid, i) => {
  const c = CREATORS[i % CREATORS.length]!;
  const [text, tags] = CAPTIONS[(i * 3) % CAPTIONS.length]!;
  const views = 1200 + ((vid * 37) % 98000);
  return {
    id: `${PRELOADED_PREFIX}${vid}`,
    authorId: `${PRELOADED_PREFIX}${c.id}`,
    authorName: c.name,
    authorUsername: c.user,
    authorPhoto: `https://i.pravatar.cc/150?img=${c.img}`,
    text: `${text} ${tags.map((t) => `#${t}`).join(" ")}`,
    mediaUrl: `https://assets.mixkit.co/videos/${vid}/${vid}-720.mp4`,
    mediaType: "video/mp4",
    likes: [],
    comments: [],
    tags,
    views,
    shares: Math.floor(views / 90),
    createdAt: BASE - i * 5 * HOUR,
  };
});
