
import os
import shutil

base_path = "C:/Projects/Resume projects/Blogs-Galaxy/src/app"
sub_pages_path = os.path.join(base_path, "(sub pages)")

pages_to_move = [
    "aiUniverse",
    "community",
    "creativeCorner",
    "geographyNebula",
    "historyConstellation",
    "motivationMeteor",
    "sportsGalaxy",
    "techGalaxy",
]

for page in pages_to_move:
    src_dir = os.path.join(base_path, page)
    dest_dir = os.path.join(sub_pages_path, page)
    src_file = os.path.join(src_dir, "page.js")
    dest_file = os.path.join(dest_dir, "page.js")

    os.makedirs(dest_dir, exist_ok=True)
    if os.path.exists(src_file):
        shutil.move(src_file, dest_file)
        print(f"Moved {src_file} to {dest_file}")
    
    # Remove the original directory if it's empty
    if os.path.exists(src_dir) and not os.listdir(src_dir):
        os.rmdir(src_dir)
        print(f"Removed empty directory {src_dir}")
