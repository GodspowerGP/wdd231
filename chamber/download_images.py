import urllib.request
import os

images_dir = r"c:\Users\HSEF 2026\Documents\GitHub\wdd231\chamber\images"

for i in range(1, 9):
    url = f"https://picsum.photos/300/200.webp?random={i}"
    filename = os.path.join(images_dir, f"place{i}.webp")
    try:
        urllib.request.urlretrieve(url, filename)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
