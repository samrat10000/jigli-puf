import sys
import subprocess
import os

def install_yt_dlp():
    print("yt-dlp module not found. Installing...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "yt-dlp"])

try:
    import yt_dlp
except ImportError:
    install_yt_dlp()
    import yt_dlp

url = "https://www.youtube.com/watch?v=syFZfO_wfMQ"

# The target directory is ../public relative to this script's directory
public_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")
os.makedirs(public_dir, exist_ok=True)
output_path = os.path.join(public_dir, "bg-music.m4a")

# To bypass ffmpeg requirement on Windows, we'll download the native m4a stream directly.
ydl_opts = {
    'format': 'm4a/bestaudio/best',
    'outtmpl': output_path,
    'noplaylist': True,
}

print(f"Downloading Audio from {url}...")
print(f"Saving to: {output_path}")

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    ydl.download([url])

print("✅ Download completed successfully! The song is now in the public folder.")
