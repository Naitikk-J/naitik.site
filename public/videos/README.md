# Scroll-Scrub Video Assets

The `ScrollVideoBackground` component looks for three files in this directory.
**Drop your encoded files here with these exact names — no code changes needed.**

| File | Purpose | Target size |
|---|---|---|
| `doodle-bg.mp4` | 4K H.264, all-keyframes, served to desktop / fast networks | 80–200 MB |
| `doodle-bg-1080.mp4` | 1080p H.264, all-keyframes, served to mobile / save-data | 20–35 MB |
| `doodle-bg-poster.jpg` | First frame, shown before video loads or when video gated off | < 200 KB |

## Why all-keyframes?

Browsers only seek smoothly to keyframes. A normal H.264 video has one
keyframe every ~2 seconds, so `video.currentTime = 1.23` has to decode
forward from the previous keyframe — that's the stutter you see on cheap
scroll-video implementations. Encoding with `-g 1 -keyint_min 1` makes
**every frame a keyframe**, trading file size for instant scrubbing.

## Encoding commands

```bash
# 4K master
ffmpeg -i your-raw-video.mp4 \
  -c:v libx264 -preset slow -crf 20 \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart -an \
  doodle-bg.mp4

# 1080p fallback
ffmpeg -i your-raw-video.mp4 \
  -c:v libx264 -preset slow -crf 22 \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -vf scale=1920:1080 \
  -pix_fmt yuv420p -movflags +faststart -an \
  doodle-bg-1080.mp4

# Poster
ffmpeg -i doodle-bg.mp4 -vframes 1 -q:v 2 doodle-bg-poster.jpg
```

## Dual-theme rendering

The video is expected to be **pure grayscale** (dark ink on cream paper).
Dark mode applies `filter: invert(1)` in CSS, automatically flipping it
to cream ink on black. Do not include color in the source video.
